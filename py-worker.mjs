import { loadPyodide } from "https://cdn.jsdelivr.net/pyodide/v314.0.7/full/pyodide.mjs";

let pyodidePromise;

async function getRuntime() {
  if (!pyodidePromise) {
    pyodidePromise = loadPyodide();
  }
  return pyodidePromise;
}

self.addEventListener("message", async (event) => {
  const { id, code, checks } = event.data;
  let namespace;
  let output = "";

  try {
    self.postMessage({ id, type: "loading-runtime" });
    const pyodide = await getRuntime();
    const allCode = checks ? `${code}\n${checks}` : code;

    self.postMessage({ id, type: "loading-packages" });
    await pyodide.loadPackagesFromImports(allCode);

    pyodide.setStdout({
      batched(text) {
        if (output.length < 12000) output += text;
      }
    });
    pyodide.setStderr({
      batched(text) {
        if (output.length < 12000) output += text;
      }
    });

    namespace = pyodide.globals.get("dict")();
    self.postMessage({ id, type: "running" });

    const result = await pyodide.runPythonAsync(code, { globals: namespace });
    if (result !== undefined && result !== null) {
      const printable = String(result);
      if (printable !== "None" && printable !== "undefined" && output.length < 12000) {
        output += `${printable}\n`;
      }
      if (typeof result.destroy === "function") result.destroy();
    }

    if (checks) {
      await pyodide.runPythonAsync(checks, { globals: namespace });
    }

    self.postMessage({
      id,
      type: "complete",
      checked: Boolean(checks),
      output: output || (checks ? "Code chạy được. Các bài kiểm tra đều qua." : "Code chạy xong nhưng không in output. Hãy thêm print(...) để xem kết quả.")
    });
  } catch (error) {
    self.postMessage({
      id,
      type: "failed",
      output,
      error: error?.message || String(error),
      errorName: error?.name || "Error"
    });
  } finally {
    if (namespace && typeof namespace.destroy === "function") namespace.destroy();
  }
});
