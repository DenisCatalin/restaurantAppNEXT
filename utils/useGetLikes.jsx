export default async function useGetLikes(displayName, asset_id) {
  const res = await fetch("/api/getLikes", {
    method: "GET",
    headers: {
      body: JSON.stringify({
        displayName: displayName,
        photoId: asset_id,
      }),
    },
  });
  const data = await res.json();

  return data;
}
