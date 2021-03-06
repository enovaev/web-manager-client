import { SpecEntityType, EntitySpecType } from '../types/interfaceState';

interface PayloadType {
  id: number;
  propName: string;
  value: string | boolean;
}

export const changeValueFromList = <T extends SpecEntityType>(
  list: T[],
  payload: PayloadType
): SpecEntityType[] =>
  list.map(item => {
    if (item.isGroup) {
      const entities = changeValueFromList(item.entities, payload);

      return {
        ...item,
        entities
      };
    }

    if (item.id === payload.id) {
      return {
        ...item,
        [payload.propName]: payload.value
      };
    }
    return item;
  });

export const filterCheckedList = <T extends SpecEntityType>(
  list: T[]
): [T[], EntitySpecType[]] => {
  let withChecked: EntitySpecType[] = [];

  const result = list.filter(item => {
    if (!item.isGroup && item.check) {
      withChecked = [...withChecked, item];
      return false;
    }
    return true;
  });

  return [result, withChecked];
};

export const findElements = <T extends SpecEntityType>(
  list: T[],
  id: number
): (EntitySpecType | null)[] => {
  let from = null;
  let to = null;

  list.forEach(item => {
    if (item.dragged) {
      from = item;
    }
    if (!item.isGroup && id === item.id) {
      to = item;
    }
  });

  return [from, to];
};
