/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getTrip = /* GraphQL */ `
  query GetTrip($id: ID!) {
    getTrip(id: $id) {
      id
      location
      startDate
      endDate
      itinerary {
        id
        name
        items {
          id
          location
          description
          link
          time
          createdAt
          updatedAt
        }
        trip {
          id
          location
          startDate
          endDate
          createdAt
          updatedAt
        }
        createdAt
        updatedAt
      }
      travelers {
        id
        name
        email
        status
        payments
        trip {
          id
          location
          startDate
          endDate
          createdAt
          updatedAt
        }
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const listTrips = /* GraphQL */ `
  query ListTrips(
    $filter: ModelTripFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listTrips(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        location
        startDate
        endDate
        itinerary {
          id
          name
          createdAt
          updatedAt
        }
        travelers {
          id
          name
          email
          status
          payments
          createdAt
          updatedAt
        }
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getDay = /* GraphQL */ `
  query GetDay($id: ID!) {
    getDay(id: $id) {
      id
      name
      items {
        id
        location
        description
        link
        time
        day {
          id
          name
          createdAt
          updatedAt
        }
        createdAt
        updatedAt
      }
      trip {
        id
        location
        startDate
        endDate
        itinerary {
          id
          name
          createdAt
          updatedAt
        }
        travelers {
          id
          name
          email
          status
          payments
          createdAt
          updatedAt
        }
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const listDays = /* GraphQL */ `
  query ListDays(
    $filter: ModelDayFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listDays(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        items {
          id
          location
          description
          link
          time
          createdAt
          updatedAt
        }
        trip {
          id
          location
          startDate
          endDate
          createdAt
          updatedAt
        }
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getItineraryItem = /* GraphQL */ `
  query GetItineraryItem($id: ID!) {
    getItineraryItem(id: $id) {
      id
      location
      description
      link
      time
      day {
        id
        name
        items {
          id
          location
          description
          link
          time
          createdAt
          updatedAt
        }
        trip {
          id
          location
          startDate
          endDate
          createdAt
          updatedAt
        }
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const listItineraryItems = /* GraphQL */ `
  query ListItineraryItems(
    $filter: ModelItineraryItemFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listItineraryItems(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        location
        description
        link
        time
        day {
          id
          name
          createdAt
          updatedAt
        }
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getTraveler = /* GraphQL */ `
  query GetTraveler($id: ID!) {
    getTraveler(id: $id) {
      id
      name
      email
      status
      payments
      trip {
        id
        location
        startDate
        endDate
        itinerary {
          id
          name
          createdAt
          updatedAt
        }
        travelers {
          id
          name
          email
          status
          payments
          createdAt
          updatedAt
        }
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const listTravelers = /* GraphQL */ `
  query ListTravelers(
    $filter: ModelTravelerFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listTravelers(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        email
        status
        payments
        trip {
          id
          location
          startDate
          endDate
          createdAt
          updatedAt
        }
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
