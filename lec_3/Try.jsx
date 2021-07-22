import React, { memo } from 'react';

const Try = (tryInfo) => {
  const info = tryInfo.tryInfo;
  return (
    <li>
      <div>{info.try}</div>
      <div>{info.result}</div>
    </li>
  )
}

export default memo(Try);
