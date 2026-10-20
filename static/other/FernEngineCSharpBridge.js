// Requires an unsandboxed extension and network access to Piston API.
// Treat remote code execution as untrusted: don't send secrets or private data.

(function (Scratch) {
  "use strict";

  if (!Scratch.extensions.unsandboxed) {
    throw new Error("C# Runner must be loaded as an unsandboxed extension.");
  }

  const API = "https://emkc.org/api/v2/piston/execute";

  class CSharpRunner {
    constructor() {
      this.output = "";
      this.error = "";
      this.running = false;
      this.lastExitCode = null;
      this.lastCode = "";
    }

    getInfo() {
      return {
        id: "nexuscsharp",
        name: "FernEngine C# Bridge",
        color1: "#68217A",
        color2: "#4E185D",
        color3: "#35103F",
        blocks: [
          {
            opcode: "runCode",
            blockType: Scratch.BlockType.COMMAND,
            text: "run C# code [CODE]",
            arguments: {
              CODE: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 'using System;\nclass Program { static void Main() { Console.WriteLine("Hello from C#!"); } }'
              }
            }
          },
          {
            opcode: "runCodeWithInput",
            blockType: Scratch.BlockType.COMMAND,
            text: "run C# code [CODE] with stdin [INPUT]",
            arguments: {
              CODE: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 'using System;\nclass Program { static void Main() { string s = Console.ReadLine(); Console.WriteLine(s); } }'
              },
              INPUT: { type: Scratch.ArgumentType.STRING, defaultValue: "hello" }
            }
          },
          {
            opcode: "getOutput",
            blockType: Scratch.BlockType.REPORTER,
            text: "C# output"
          },
          {
            opcode: "getError",
            blockType: Scratch.BlockType.REPORTER,
            text: "C# error"
          },
          {
            opcode: "getExitCode",
            blockType: Scratch.BlockType.REPORTER,
            text: "C# exit code"
          },
          {
            opcode: "getJSONValue",
            blockType: Scratch.BlockType.REPORTER,
            text: "C# JSON value at key [KEY]",
            arguments: {
              KEY: { type: Scratch.ArgumentType.STRING, defaultValue: "score" }
            }
          },
          {
            opcode: "isRunning",
            blockType: Scratch.BlockType.BOOLEAN,
            text: "C# is running?"
          },
          {
            opcode: "clearResults",
            blockType: Scratch.BlockType.COMMAND,
            text: "clear C# results"
          }
        ]
      };
    }

    async runCode(args) {
      return this.execute(String(args.CODE ?? ""), "");
    }

    async runCodeWithInput(args) {
      return this.execute(String(args.CODE ?? ""), String(args.INPUT ?? ""));
    }

    async execute(code, stdin) {
      this.running = true;
      this.output = "";
      this.error = "";
      this.lastExitCode = null;
      this.lastCode = code;

      try {
        const response = await fetch(API, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            language: "csharp",
            version: "*",
            files: [{ name: "main.cs", content: code }],
            stdin: stdin,
            args: [],
            compile_timeout: 10000,
            run_timeout: 5000
          })
        });

        if (!response.ok) {
          throw new Error("C# service returned HTTP " + response.status);
        }

        const data = await response.json();

        if (data.message) {
          throw new Error(data.message);
        }

        const compile = data.compile || {};
        const run = data.run || {};

        this.output = String(run.stdout || "").trimEnd();
        this.error = [compile.stderr, compile.output, run.stderr]
          .filter(Boolean)
          .join("\n")
          .trim();

        this.lastExitCode = typeof run.code === "number" ? run.code : null;

        if (compile.code && !this.error) {
          this.error = "C# compilation failed.";
        }
      } catch (err) {
        this.error = String(err && err.message ? err.message : err);
      } finally {
        this.running = false;
      }
    }

    getOutput() {
      return this.output;
    }

    getError() {
      return this.error;
    }

    getExitCode() {
      return this.lastExitCode === null ? "" : this.lastExitCode;
    }

    getJSONValue(args) {
      try {
        const parsed = JSON.parse(this.output);
        const key = String(args.KEY ?? "");
        const value = key.split(".").reduce((current, part) => {
          if (current === null || current === undefined) return undefined;
          return current[part];
        }, parsed);

        if (value === undefined || value === null) return "";
        return typeof value === "object" ? JSON.stringify(value) : String(value);
      } catch (err) {
        this.error = String(err && err.message ? err.message : err);
        return "";
      }
    }

    isRunning() {
      return this.running;
    }

    clearResults() {
      this.output = "";
      this.error = "";
      this.lastExitCode = null;
      this.lastCode = "";
    }
  }

  Scratch.extensions.register(new CSharpRunner());
})(Scratch);
