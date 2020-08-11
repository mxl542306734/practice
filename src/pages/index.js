import React, { useState } from 'react';
import { Form, Button, Select, Radio } from 'antd';
import { getCitys } from '../service/api';
import styles from './index.less';
import CitySelector from '@/components/CitySelector';
const FormItem = Form.Item;
const { Option } = Select;
const RadioGroup = Radio.Group;
export default () => {
  const province = [
    {
      id: 1,
      name: '四川省',
    },
    {
      id: 2,
      name: '河北省',
    },
  ];
  const [curProv, setCurProv] = useState();
  const [mulit, setMulit] = useState(false);
  // // 城市数据可参照下面的API获取
  // getCitys({ province: '四川省' }).then(res => console.log(res));
  // getCitys({ province: '广东省' }).then(res => console.log(res));
  const [form] = Form.useForm();
  const onFinish = values => {
    console.log('Success:', values);
  };

  const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
  };
  const onChange = value => {
    console.log('CitySelector:-----', value);
  };
  const validator = (rules, value, callback) => {
    if (!value) {
      callback('请选择城市!');
    } else {
      callback();
    }
  };
  return (
    <div style={{ padding: 100 }}>
      <h1 className={styles.title}>Practice</h1>
      <p>
        请参照Ant
        Design的Select、Form组件相关文档，实现一个城市下拉选择组件CitySelector。
      </p>
      <ul>
        <li>要求1：CitySelector需为受控组件。</li>
        <li>
          要求2：CitySelector需从父组件接收名为province的props，根据province获取城市列表；每当province改变时，城市列表也应更新。
        </li>
        <li>要求3：CitySelector可从父组件接收props，实现其单选/多选的定制。</li>
        <li>
          要求4：CitySelector可以与Form组件一起使用，即组件的值可被Form收集并校验。
        </li>
      </ul>
      <Form
        form={form}
        name="practice"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        {/* 此处放入CitySelector */}
        <FormItem>
          <Select onChange={tar => setCurProv(tar)}>
            {province.map(item => (
              <Option key={item.id} value={item.id}>
                {item.name}
              </Option>
            ))}
          </Select>
        </FormItem>
        <FormItem name="citySelector" rules={[{ validator }]}>
          <CitySelector multiple={mulit} province={curProv}></CitySelector>
        </FormItem>
        <FormItem>
          <Button style={{ marginRight: 12 }} type="primary" htmlType="submit">
            提交
          </Button>
          <RadioGroup value={mulit} onChange={e => setMulit(e.target.value)}>
            <Radio value={true}>全选</Radio>
            <Radio value={false}>单选</Radio>
          </RadioGroup>
        </FormItem>
      </Form>
    </div>
  );
};
