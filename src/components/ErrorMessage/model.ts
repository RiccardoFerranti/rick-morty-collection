import { ApolloError } from "@apollo/client";

export type TError = Pick<ApolloError, 'message'>
