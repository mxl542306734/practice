import React, { useEffect, useState } from 'react';
import { Select } from 'antd';
import { getCitys } from '@/service/api';
const { Option } = Select;
export default function CitySelector(props) {
  const {
    province = '四川省',
    value,
    onChange,
    multiple = false,
    ...prop
  } = props;
  const [opts, setOpts] = useState([]);
  const [selfValue, setSelfValue] = useState([]);
  const handleChange = target => {
    console.log('sdsad', target);
    if (onChange) {
      onChange(Array.isArray(target) ? target : [target]);
    }
  };
  useEffect(() => {
    setSelfValue(value);
  }, [value]);
  useEffect(() => {
    getCitys({ province }).then(res => {
      console.log('请求结果:', res);
      setOpts(res.list);
    });
  }, [province]);
  return (
    <Select
      value={
        multiple
          ? selfValue
          : Array.isArray(selfValue)
          ? selfValue[0]
          : selfValue
      }
      mode={multiple ? 'multiple' : ''}
      style={{ width: 200 }}
      onChange={handleChange}
      {...prop}
    >
      {opts.length > 0
        ? opts.map(item => (
            <Option key={item.id} value={item.id}>
              {item.city}
            </Option>
          ))
        : null}
    </Select>
  );
}
