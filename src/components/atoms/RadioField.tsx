import React from "react";
import { Form, Radio } from "antd";
import { FieldProps } from "formik";

import { Connection } from "../../redux/types";

const RadioGroup = Radio.Group;

const FormItem = Form.Item;

interface RadioOption {
    key: string,
    value: string
}

interface RadioProps {
    label: string;
    options: RadioOption[];
    defaultValue: string
}

type FormValues = Connection;

type InputOwnProps = FieldProps<FormValues> & RadioProps;

const onChange = (e: any) => {
    console.log(e);
};

export const RadioField: React.FC<InputOwnProps> = ({
    label,
    defaultValue,
    field,
    form,
    options
}: any) => {
    // console.log("name", name)
    return (
        <FormItem
            label={label}
            hasFeedback={!!form.errors.name}
            validateStatus={form.errors[field.name] && "error"}
            help={form.errors[field.name]}
        >
            <RadioGroup {...field} value={defaultValue}>
                {options && options.map((item: RadioOption) => {
                    return <Radio disabled={item.key !== defaultValue} value={item.key}>{item.value}</Radio>
                })}
            </RadioGroup>
            {/* <Input onChange={onChange} size="large" type="text" {...field} placeholder={placeHolder} /> */}
        </FormItem>
    );
};