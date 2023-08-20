import { WritableDraft } from 'immer/dist/types/types-external';
import { produce } from 'immer';

type Entity = { _id?: string };

export const findStateEntityById = <E extends Entity = Entity>(
  state: WritableDraft<E>[],
  id: string
): WritableDraft<E> | undefined => state.find(({ _id }) => _id === id);

export const findStateEntityIndexById = <E extends Entity = Entity>(
  state: WritableDraft<E>[],
  id: string
): number => state.findIndex(({ _id }) => _id === id);

export const updateStateEntity = <E extends Entity = Entity>(
  state: WritableDraft<E>[],
  update: Partial<E>
): WritableDraft<E> | undefined => {
  const entity = findStateEntityById(state, update._id!);
  if (entity) {
    Object.entries(update).forEach(([key, value]) => {
      entity[key as keyof Omit<E, '_id'>] = <never>value;
    });
    return entity;
  }
  return undefined;
};

export const removeEntityFromState = <E extends Entity = Entity>(
  state: WritableDraft<E>[],
  id: string
): WritableDraft<E>[] => {
  const entityIndex = findStateEntityIndexById(state, id);
  return produce(state, (draft) => {
    draft.splice(entityIndex, 1);
  });
};
