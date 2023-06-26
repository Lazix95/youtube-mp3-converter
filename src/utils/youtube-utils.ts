export function getYouTubeVideoId(videoUrl: string): string | null {
  // Regular expression pattern to extract video ID
  const pattern =
    /^(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/|youtube\.com\/(?:v\/|vi\/|e\/|u\/|embed\/))([\w-]{11})(?:\S+)?$/;

  // Extract the video ID using the pattern
  const match = videoUrl.match(pattern);

  if (match && match[1]) {
    return match[1]; // Return the extracted video ID
  } else {
    return null; // Invalid YouTube video URL
  }
}
