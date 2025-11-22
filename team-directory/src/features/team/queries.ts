import { gql } from '@apollo/client';

export const GET_TEAM_MEMBERS = gql`
  query GetTeamMembers($page: Int, $limit: Int, $search: String, $role: String, $sortField: String, $sortOrder: String) {
    teamMembers(page: $page, limit: $limit, search: $search, role: $role) {
      data {
        id
        name
        email
        role
        avatar
      }
      meta {
        totalItems
        totalPages
        currentPage
      }
    }
  }
`;
