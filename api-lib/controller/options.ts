

export const articlesServiceOptions = {
  signedIn: {
    query: {},
    projection: "-_id",
    option: {
      limit: 6,
      sort: "-createdAt"
    },
    populate: {
      path: "author collaborators",
      select: "-_id -email -password -writerId -writings"
    }
  },
  signedOut: {
    projection: {
      readings: { $slice: -3 },
      _id: 0
    },
    populate: {
      path: "readings",
      select: "-_id",
      populate: {
        path: "author collaborators",
        select: "-_id -email -password -writerId -writings"
      }
    }
  }
}