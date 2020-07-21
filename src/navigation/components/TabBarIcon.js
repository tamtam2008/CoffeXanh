import * as React from 'react';
import CustomIcon from '../../components/CustomIcon';

export default function TabBarIcon({ icon, focused }) {
  return (
    <CustomIcon
      name={icon.name}
      size={28}
      type={icon.type}
      focused={focused ? focused : false}
      other={icon.other}
    />
  );
}
