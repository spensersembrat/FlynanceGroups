/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateTrip = /* GraphQL */ `
  subscription OnCreateTrip {
    onCreateTrip {
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
export const onUpdateTrip = /* GraphQL */ `
  subscription OnUpdateTrip {
    onUpdateTrip {
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
export const onDeleteTrip = /* GraphQL */ `
  subscription OnDeleteTrip {
    onDeleteTrip {
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
export const onCreateDay = /* GraphQL */ `
  subscription OnCreateDay {
    onCreateDay {
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
export const onUpdateDay = /* GraphQL */ `
  subscription OnUpdateDay {
    onUpdateDay {
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
export const onDeleteDay = /* GraphQL */ `
  subscription OnDeleteDay {
    onDeleteDay {
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
export const onCreateItineraryItem = /* GraphQL */ `
  subscription OnCreateItineraryItem {
    onCreateItineraryItem {
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
export const onUpdateItineraryItem = /* GraphQL */ `
  subscription OnUpdateItineraryItem {
    onUpdateItineraryItem {
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
export const onDeleteItineraryItem = /* GraphQL */ `
  subscription OnDeleteItineraryItem {
    onDeleteItineraryItem {
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
export const onCreateTraveler = /* GraphQL */ `
  subscription OnCreateTraveler {
    onCreateTraveler {
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
export const onUpdateTraveler = /* GraphQL */ `
  subscription OnUpdateTraveler {
    onUpdateTraveler {
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
export const onDeleteTraveler = /* GraphQL */ `
  subscription OnDeleteTraveler {
    onDeleteTraveler {
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
