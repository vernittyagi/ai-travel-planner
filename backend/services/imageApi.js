import dotenv from 'dotenv';
dotenv.config()

const apiKey = process.env.PEXEL_API_KEY;

async function getPlaceImage(destination) {
  const page = Math.floor(Math.random() * 10) + 1;
  console.log("page is - ", page);
  
  let imageUrl = ""
  const response = await fetch(`https://api.pexels.com/v1/search?query=${destination}&per_page=${page}`, {
    headers: {
      Authorization: apiKey
    }
  });

  const data = await response.json();
  
  if (data.photos && data.photos.length > 0) {
    // Get the 'large' version of the first image found
    const photo = data.photos[0];
    imageUrl = photo?.src?.landscape || photo?.src?.large || photo?.src?.original;
    console.log("Image URL:", imageUrl);
  } else {
    console.log("No images found for this place.");
  }
  return imageUrl
}

export default getPlaceImage;
