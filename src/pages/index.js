import React from 'react';
import { Form, Button } from 'antd';
import { getCitys } from '../service/api';
import styles from './index.less';
import CitySelector from '@/components/CitySelector';
const FormItem = Form.Item;
export default () => {
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
        <FormItem name="citySelector" rules={[{ validator }]}>
          <CitySelector multiple={false} province="四川"></CitySelector>
        </FormItem>
        <FormItem>
          <Button type="primary" htmlType="submit">
            提交
          </Button>
        </FormItem>
      </Form>
    </div>
  );
};
