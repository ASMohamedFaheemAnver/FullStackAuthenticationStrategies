import { gql } from "@apollo/client";

export const SUB_LAST_SEEN_SUBSCRIPTION = gql`
  subscription {
    subLastSeen {
      time
    }
  }
`;
