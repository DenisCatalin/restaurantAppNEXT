export async function useFetchUserDetails() {
  const res = await fetch("/api/userDetails");
  const data = await res.json();

  return data;
}

export async function useCheckOrders(issuer) {
  const res = await fetch("/api/checkOrders", {
    method: "GET",
    headers: {
      body: JSON.stringify({
        userId: issuer,
      }),
    },
  });
  const data = await res.json();

  return data;
}

export async function useCheckBookingHistory(issuer) {
  const res = await fetch("/api/checkBookingHistory", {
    method: "GET",
    headers: {
      body: JSON.stringify({
        issuer: issuer,
      }),
    },
  });
  const data = await res.json();

  return data;
}

export async function useChangeDisplayName(
  newDisplayName,
  displayName,
  profilePic,
  email
) {
  const res = await fetch("/api/changeDisplayName", {
    method: "POST",
    headers: {
      body: JSON.stringify({
        newDisplayName: newDisplayName,
        displayName: displayName,
        profilePic: profilePic,
        email: email,
      }),
    },
  });
  const data = await res.json();

  return data;
}

export async function useChangeAddress(
  newAddress,
  displayName,
  profilePic,
  email
) {
  const res = await fetch("/api/changeAddress", {
    method: "POST",
    headers: {
      body: JSON.stringify({
        newAddress: newAddress,
        displayName: displayName,
        profilePic: profilePic,
        email: email,
      }),
    },
  });
  const data = await res.json();

  return data;
}

export async function useLogin(didToken) {
  const res = await fetch("/api/login", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${didToken}`,
      "Content-type": "application/json",
    },
  });
  const data = await res.json();

  return data;
}

export async function useLogout(didToken) {
  const res = await fetch("/api/logout", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${didToken}`,
      "Content-Type": "application/json",
    },
  });
  const data = await res.json();

  return data;
}

export async function useAddTablesToBooking(
  Bookings,
  issuer,
  seatsNumber,
  dateString,
  date
) {
  const res = await fetch("/api/addTablesToBooking", {
    method: "POST",
    headers: {
      body: JSON.stringify({
        tables: Bookings,
        issuer: issuer,
        seats: seatsNumber,
        date: dateString,
        currentDate: date,
      }),
    },
  });
  const data = await res.json();

  return data;
}

export async function useCheckTablesForBooking(dateString) {
  const res = await fetch("/api/checkTablesForBooking", {
    method: "GET",
    headers: {
      body: JSON.stringify({
        date: dateString,
      }),
    },
  });
  const data = await res.json();

  return data;
}

export async function useUploadPhoto(displayName, url, profilePic, username) {
  const res = await fetch("/api/uploadPhoto", {
    method: "POST",
    headers: {
      body: JSON.stringify({
        displayName: displayName,
        newProfilePic: url,
        profilePic: profilePic,
        email: username,
      }),
    },
  });
  const data = await res.json();

  return data;
}

export async function useGetComments(asset_id) {
  const res = await fetch("/api/getComments", {
    method: "GET",
    headers: {
      "Content-type": "application/json",
      body: JSON.stringify({
        photoId: asset_id,
      }),
    },
  });
  const data = await res.json();

  return data;
}

export async function usePostComment(
  asset_id,
  displayName,
  profilePic,
  comment
) {
  const res = await fetch("/api/postComment", {
    method: "POST",
    headers: {
      "Content-type": "application/json",
      body: JSON.stringify({
        photoId: asset_id,
        displayName,
        profilePic,
        comment,
      }),
    },
  });
  const data = await res.json();

  return data;
}

export async function useModifyLike(asset_id, displayName, like) {
  const res = await fetch("/api/modifyLike", {
    method: "POST",
    headers: {
      body: JSON.stringify({
        displayName: displayName,
        photoId: asset_id,
        like: like ? false : true,
      }),
    },
  });
  const data = await res.json();

  return data;
}

export async function useAddOrder(
  finalCart,
  payment,
  dateString,
  issuer,
  email,
  finalPrice
) {
  const res = await fetch("/api/addOrders", {
    method: "POST",
    headers: {
      body: JSON.stringify({
        cart: JSON.stringify(finalCart),
        paymentId: payment,
        currentDate: dateString,
        userId: issuer,
        email: email,
        price: finalPrice,
      }),
    },
  });
  const data = await res.json();

  return data;
}
