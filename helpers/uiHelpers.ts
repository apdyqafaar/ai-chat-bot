export const downloadImage = async (url: string) => {
  try {
    const response = await fetch(url);

    const blob = await response.blob();
    const blobUrl = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = blobUrl;
    link.download = `ai-image-${Date.now()}.png`;
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(blobUrl);
  } catch (error) {
    console.error("Download failed:", error);
  }
};


export const copyImageUrl = async (url: string, setIsCopeid:any) => {
  try {
    await navigator.clipboard.writeText(url);
    console.log("Image URL copied:", url);
    // Optionally: show a toast/alert
    setIsCopeid(true)
    setTimeout(()=>{
        setIsCopeid(false)
    }, 3000 )
  } catch (error) {
    console.error("Failed to copy URL:", error);
  }
};
