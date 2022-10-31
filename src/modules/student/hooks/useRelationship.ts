import type { Relationship } from "../models";
import { useFetch } from "hooks";
import { useCallback } from "react";
import {
  createRelationship,
  deleteRelationship,
  getRelationship,
  getRelationships,
  updateRelationship,
} from "../services";
import { optionFetchType } from "hooks/useFetch";

const useRelationship = (options: optionFetchType = {}) => {
  const { loading, callEndpoint } = useFetch(options);

  const create = useCallback((relationship: Relationship) => {
    return callEndpoint(createRelationship(relationship));
  }, []);

  const update = useCallback((relationship: Relationship) => {
    return callEndpoint(updateRelationship(relationship));
  }, []);

  const getAll = useCallback(() => {
    return callEndpoint(getRelationships());
  }, []);

  const remove = useCallback((idRelationship: number) => {
    return callEndpoint(deleteRelationship(idRelationship));
  }, []);

  const get = useCallback((idRelationship: number) => {
    return callEndpoint(getRelationship(idRelationship));
  }, []);

  return {
    get,
    getAll,
    create,
    update,
    remove,
    loading,
  };
};

export default useRelationship;
