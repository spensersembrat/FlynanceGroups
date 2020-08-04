/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createTrip = /* GraphQL */ `
  mutation CreateTrip(
    $input: CreateTripInput!
    $condition: ModelTripConditionInput
  ) {
    createTrip(input: $input, condition: $condition) {
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
export const updateTrip = /* GraphQL */ `
  mutation UpdateTrip(
    $input: UpdateTripInput!
    $condition: ModelTripConditionInput
  ) {
    updateTrip(input: $input, condition: $condition) {
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
export const deleteTrip = /* GraphQL */ `
  mutation DeleteTrip(
    $input: DeleteTripInput!
    $condition: ModelTripConditionInput
  ) {
    deleteTrip(input: $input, condition: $condition) {
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
export const createDay = /* GraphQL */ `
  mutation CreateDay(
    $input: CreateDayInput!
    $condition: ModelDayConditionInput
  ) {
    createDay(input: $input, condition: $condition) {
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
export const updateDay = /* GraphQL */ `
  mutation UpdateDay(
    $input: UpdateDayInput!
    $condition: ModelDayConditionInput
  ) {
    updateDay(input: $input, condition: $condition) {
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
export const deleteDay = /* GraphQL */ `
  mutation DeleteDay(
    $input: DeleteDayInput!
    $condition: ModelDayConditionInput
  ) {
    deleteDay(input: $input, condition: $condition) {
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
export const createItineraryItem = /* GraphQL */ `
  mutation CreateItineraryItem(
    $input: CreateItineraryItemInput!
    $condition: ModelItineraryItemConditionInput
  ) {
    createItineraryItem(input: $input, condition: $condition) {
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
export const updateItineraryItem = /* GraphQL */ `
  mutation UpdateItineraryItem(
    $input: UpdateItineraryItemInput!
    $condition: ModelItineraryItemConditionInput
  ) {
    updateItineraryItem(input: $input, condition: $condition) {
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
export const deleteItineraryItem = /* GraphQL */ `
  mutation DeleteItineraryItem(
    $input: DeleteItineraryItemInput!
    $condition: ModelItineraryItemConditionInput
  ) {
    deleteItineraryItem(input: $input, condition: $condition) {
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
export const createTraveler = /* GraphQL */ `
  mutation CreateTraveler(
    $input: CreateTravelerInput!
    $condition: ModelTravelerConditionInput
  ) {
    createTraveler(input: $input, condition: $condition) {
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
export const updateTraveler = /* GraphQL */ `
  mutation UpdateTraveler(
    $input: UpdateTravelerInput!
    $condition: ModelTravelerConditionInput
  ) {
    updateTraveler(input: $input, condition: $condition) {
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
export const deleteTraveler = /* GraphQL */ `
  mutation DeleteTraveler(
    $input: DeleteTravelerInput!
    $condition: ModelTravelerConditionInput
  ) {
    deleteTraveler(input: $input, condition: $condition) {
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
