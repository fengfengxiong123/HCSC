import React, { useState } from 'react';
import { Card } from "../../../../components/ui/card";
import { Button } from "../../../../components/ui/button";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useWallet } from '@suiet/wallet-kit';
import { Transaction } from '@mysten/sui/transactions';

export function FormComponent() {
    const [formData, setFormData] = useState({
        nameInput: '',
        timeInput: new Date(),
        wbcInput: '',
        rbcInput: '',
        pltInput: '',
        cInput: '',
    })

    const { account } = useWallet();
    const tx = new Transaction();


    const handleChange = (e) => {
        console.log(e)
        console.log(e.target)
        const { name, value } = e.target;
        console.log(name)
        console.log(value)
        setFormData((preData) => ({
            ...preData,
            [name]: value
        }))
    }

    const handleTimeChange = (date) => {
        setFormData((prevData) => ({
            ...prevData,
            timeInput: date
        }));
    };

    const handleSubmit = (e) => {
        console.log(e)
        e.preventDefault();
        console.log('Form Data:', formData);
        const report_name = formData.nameInput
        const report_wbc = formData.wbcInput
        const report_rbc = formData.rbcInput
        const report_pla = formData.pltInput
        const report_crp = formData.cInput
        const report_date = formData.timeInput.getTime()
        if (account) {
            tx.setSender(account.address);
            const data = tx.moveCall({
                target: '0x1be961232f8682cb89f2d6b487f790a2e979d051f6cdb5a2d274b0cbe0d82608::hcsc_v4::create_lab_report',
                arguments: [
                    tx.pure.string(report_name),
                    tx.pure.u64(report_wbc),
                    tx.pure.u64(report_rbc),
                    tx.pure.u64(report_pla),
                    tx.pure.u64(report_crp),
                    tx.pure.u64(report_date),
                    tx.object('0x66f2ce8d058b1cabbaaebeb19593dcddef850f37b3a232dcb462498f1445c35f')
                ],
            });
            console.log(data)
        }

    }

    return (<div style={{ padding: '20px' }}>
        <h2>报告上链</h2>
        <Card className="relative overflow-hidden bg-white-600 p-6 text-black">
            <form onSubmit={handleSubmit}>
                {/* 字符串输入框 */}
                <div>
                    <label htmlFor="nameInput">报告名:</label>
                    <input
                        type="text"
                        id="nameInput"
                        name="nameInput"
                        value={formData.nameInput}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div>
                    <label htmlFor="timeInput">报告生成日期:</label>
                    <DatePicker
                        selected={formData.timeInput}
                        onChange={handleTimeChange}
                        showTimeSelect
                        timeFormat="HH:mm"
                        timeIntervals={15}
                        dateFormat="YYYY年MM月dd日 HH:mm" // ISO 8601 格式，例如 "2023-10-05T14:30"
                        placeholderText="选择日期时间"
                        className="custom-datepicker" // 自定义样式类
                        required
                    />
                </div>

                <div>
                    <label htmlFor="wbcInput">白细胞计数:</label>
                    <input
                        type="number"
                        id="wbcInput"
                        name="wbcInput"
                        value={formData.wbcInput}
                        onChange={handleChange}
                        step="any" // 允许输入小数
                        required
                    />
                </div>

                <div >
                    <label htmlFor="rbcInput">红细胞计数:</label>
                    <input
                        type="number"
                        id="rbcInput"
                        name="rbcInput"
                        value={formData.rbcInput}
                        onChange={handleChange}
                        step="any" // 允许输入小数
                        required
                    />
                </div>

                <div>
                    <label htmlFor="pltInput">血小板计数:</label>
                    <input
                        type="number"
                        id="pltInput"
                        name="pltInput"
                        value={formData.pltInput}
                        onChange={handleChange}
                        step="any" // 允许输入小数
                        required
                    />
                </div>

                <div>
                    <label htmlFor="cInput">c反应蛋白:</label>
                    <input
                        type="number"
                        id="cInput"
                        name="cInput"
                        value={formData.cInput}
                        onChange={handleChange}
                        step="any" // 允许输入小数
                        required
                    />
                </div>

                <div style={{ marginTop: '20px' }}>
                    <Button
                        variant="secondary"
                        className="bg-white/20 hover:bg-white/30"
                        type="submit"
                    >
                        查看诊断单
                    </Button>
                </div>
            </form>
        </Card>
    </div>
    )
}
