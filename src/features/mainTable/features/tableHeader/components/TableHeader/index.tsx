import React, { FC } from 'react';
import { useDispatch } from 'shared/hooks/customReduxHooks';
import { addPosition } from 'features/mainTable/actions/entityActions';
import { mainTableConfig } from '../../../../config/mainTableConfig';

import styles from './styles.module.less';

// @ts-ignore
export const TableHeader: FC<{}> = () => {
  const dispatch = useDispatch();

  return (
    <thead>
      <tr className={styles.headerRow}>
        {mainTableConfig.map(({ name, label }) => (
          <th className={styles.headerCell} key={name}>
            {/* <button onClick={() => dispatch(addPosition())}>click</button> */}
            {label}
          </th>
        ))}
      </tr>
    </thead>
  );
};
