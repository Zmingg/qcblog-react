import React, { Component } from 'react';
import { Table } from 'antd';

export default class MyFrom extends Component {

    sum = (items, key) => {
        let _sum = 0;
        items.map((value) => {
            _sum += value[key];
        });
        return _sum;
    };

    render() {
        const { sum } = this;

        const dataSource = [{
            key: '1',
            name: '胡彦斌',
            age: 32,
            count: 20
        }, {
            key: '2',
            name: '胡彦祖',
            age: 42,
            count: 30
        }];

        const columns = [{
            title: '姓名',
            dataIndex: 'name',
            key: 'name',
        }, {
            title: '年龄',
            dataIndex: 'age',
            key: 'age',
        }, {
            title: '人数',
            dataIndex: 'count',
            key: 'count',
        }];

        dataSource.push({
            key: 'sum',
            name: '总计',
            age: sum(dataSource, 'age'),
            count: sum(dataSource, 'count')
        });

        return (
            <Table dataSource={dataSource}
                   columns={columns}
                   pagination={false}
                   bordered/>
        );
    }
}