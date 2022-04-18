export async function isNewUser(token, issuer) {
  console.log("[hasura.js] isNewUser");
  const operationsDoc = `
    query isNewUser($issuer: String!) {
      users(where: {issuer: {_eq: $issuer}}) {
        id
        email
        issuer
      }
    }
`;
  const response = await queryHasuraGQL(
    operationsDoc,
    "isNewUser",
    { issuer },
    token
  );

  return response?.data?.users?.length === 0;
}

export async function createNewUser(token, metadata) {
  console.log("[hasura.js] createNewUser");
  const operationsDoc = `
  mutation createNewUser($issuer: String!, $email: String!, $publicAddress: String!) {
    insert_users(objects: {email: $email, issuer: $issuer, publicAddress: $publicAddress}) {
      returning {
        email
        id
        issuer
      }
    }
  }
`;

  const { issuer, email, publicAddress } = metadata;
  const response = await queryHasuraGQL(
    operationsDoc,
    "createNewUser",
    {
      issuer,
      email,
      publicAddress,
    },
    token
  );

  return response;
}

export async function getScheduleQueryHasura(token, day) {
  const operationsDoc = `
  query getSchedule($day: Int!) {
    schedule(where: {eventDay: {_eq: $day}}) {
      eventDay
      eventMonth
      eventStartHour
      eventStopHour
      eventType
      eventYear
      id
    }
  }
`;
  const response = await queryHasuraGQL(
    operationsDoc,
    "getSchedule",
    { day },
    token
  );

  return response;
}

export async function getUserDetailsQuery(token, issuer) {
  const operationsDoc = `
  query getUserDetails($issuer: String!) {
    users(where: {issuer: {_eq: $issuer}}) {
      displayName,
      profilePic, 
      email,
      address
    }
  }
`;
  const response = await queryHasuraGQL(
    operationsDoc,
    "getUserDetails",
    { issuer },
    token
  );

  return response;
}

export async function getCommentsQuery(token, photoId) {
  const operationsDoc = `
  query getComments($photoId: String!) {
    comments(where: {photoId: {_eq: $photoId}}) {
      comment
      displayName
      id
      photoId
      profilePic
      visible
    }
  }
`;
  const response = await queryHasuraGQL(
    operationsDoc,
    "getComments",
    { photoId },
    token
  );

  return response;
}

export async function getLikesQuery(token, photoId, displayName) {
  const operationsDoc = `
  query getLikes($photoId: String!, $displayName: String!) {
    likes(where: {photoId: {_eq: $photoId}, displayName: {_eq: $displayName}}) {
      displayName
      id
      photoId
      like
    }
  }
`;
  const response = await queryHasuraGQL(
    operationsDoc,
    "getLikes",
    { photoId, displayName },
    token
  );

  return response;
}

export async function createLikeQuery(token, photoId, displayName) {
  const operationsDoc = `
  mutation createLikeQuery($photoId: String!, $displayName: String!) {
    insert_likes(objects: {photoId: $photoId, displayName: $displayName}) {
      returning {
        id
        photoId
        displayName
        like
      }
    }
  }
`;

  const response = await queryHasuraGQL(
    operationsDoc,
    "createLikeQuery",
    {
      photoId,
      displayName,
    },
    token
  );

  return response;
}

export async function modifyLikeQuery(token, photoId, displayName, like) {
  const operationsDoc = `
  mutation modifyLike($photoId: String!, $displayName: String!, $like: Boolean!) {
    update_likes(where: {displayName: {_eq: $displayName}, photoId: {_eq: $photoId}}, _set: {like: $like}) {
      affected_rows
      returning {
        like
      }
    }
  }
`;

  console.log(photoId, displayName, like);

  const response = await queryHasuraGQL(
    operationsDoc,
    "modifyLike",
    {
      photoId,
      displayName,
      like,
    },
    token
  );

  return response;
}

export async function postComments(
  token,
  comment,
  displayName,
  profilePic,
  photoId
) {
  const operationsDoc = `
  mutation postComment($comment: String!, $displayName: String!, $profilePic: String!, $photoId: String!) {
    insert_comments(objects: {comment: $comment, displayName: $displayName, photoId: $photoId, profilePic: $profilePic, visible: true}) {
      affected_rows
    }
  }
`;
  const response = await queryHasuraGQL(
    operationsDoc,
    "postComment",
    { comment, displayName, profilePic, photoId },
    token
  );

  return response;
}

export async function changeDisplayNameQuery(
  token,
  newDisplayName,
  displayName,
  profilePic,
  email
) {
  const operationsDoc = `
  mutation changeDisplayName($newDisplayName: String!, $displayName: String!, $profilePic: String!, $email: String!) {
    update_users(where: {
        displayName: {_eq: $displayName},
        profilePic: {_eq: $profilePic},
        email: {_eq: $email}
      }, 
      _set: {displayName: $newDisplayName}) {
      affected_rows
      returning { displayName }
    }
  }
`;

  const response = await queryHasuraGQL(
    operationsDoc,
    "changeDisplayName",
    {
      newDisplayName,
      displayName,
      profilePic,
      email,
    },
    token
  );

  return response;
}

export async function changeAddressQuery(
  token,
  newAddress,
  displayName,
  profilePic,
  email
) {
  const operationsDoc = `
  mutation changeAddress($newAddress: String!, $displayName: String!, $profilePic: String!, $email: String!) {
    update_users(where: {
        displayName: {_eq: $displayName},
        profilePic: {_eq: $profilePic},
        email: {_eq: $email}
      }, 
      _set: {address: $newAddress}) {
      affected_rows
      returning { address }
    }
  }
`;

  const response = await queryHasuraGQL(
    operationsDoc,
    "changeAddress",
    {
      newAddress,
      displayName,
      profilePic,
      email,
    },
    token
  );

  return response;
}

export async function changeNewProfilePicQuery(
  token,
  newProfilePic,
  displayName,
  profilePic,
  email
) {
  const operationsDoc = `
  mutation newProfilePic($newProfilePic: String!, $displayName: String!, $profilePic: String!, $email: String!) {
    update_users(where: {
        displayName: {_eq: $displayName},
        profilePic: {_eq: $profilePic},
        email: {_eq: $email}
      }, 
      _set: {profilePic: $newProfilePic}) {
      affected_rows
      returning { profilePic }
    }
  }
`;

  const response = await queryHasuraGQL(
    operationsDoc,
    "newProfilePic",
    {
      newProfilePic,
      displayName,
      profilePic,
      email,
    },
    token
  );

  return response;
}

async function queryHasuraGQL(operationsDoc, operationName, variables, token) {
  const result = await fetch(`${process.env.NEXT_PUBLIC_HASURA_ADMIN_URL}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-type": "application/json",
    },
    body: JSON.stringify({
      query: operationsDoc,
      variables: variables,
      operationName: operationName,
    }),
  });

  return await result.json();
}
