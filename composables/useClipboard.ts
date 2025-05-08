export default (): { copyText: (text: string) => Promise<void> } => {
  const copyText = async (text: string) => {
    try {
      // 標準の Clipboard API
      await navigator.clipboard.writeText(text);
    } catch {
      // フォールバック：古いやり方
      const textarea = document.createElement("textarea");
      textarea.value = text;
      textarea.style.position = "fixed"; // iOS Safari でズーム防止
      textarea.style.opacity = "0";
      document.body.appendChild(textarea);
      textarea.focus();
      textarea.select();

      try {
        const successful = document.execCommand("copy");
        if (!successful) throw new Error("execCommand 失敗");
      } catch (fallbackErr) {
        console.error("フォールバックでもコピーできませんでした", fallbackErr);
        throw fallbackErr;
      } finally {
        document.body.removeChild(textarea);
      }
    }
  };

  return { copyText };
};
