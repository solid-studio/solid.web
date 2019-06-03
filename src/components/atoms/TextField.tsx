import React from "react";
import { Form, Input } from "antd";
import { FieldProps } from "formik";

import { Connection } from "../../redux/types";

const FormItem = Form.Item;

interface InputProps {
    label: string;
    placeHolder?: string;
}

type FormValues = Connection;

type InputOwnProps = FieldProps<FormValues> & InputProps;
const onChange = (e: any) => {
    console.log(e);
};
export const TextField: React.FC<InputOwnProps> = ({
    label,
    field,
    form,
    placeHolder
}: any) => {
    return (
        <FormItem
            label={label}
            hasFeedback={!!form.errors.name}
            validateStatus={form.errors[field.name] && "error"}
            help={form.errors[field.name]}
        >
            <Input onChange={onChange} size="large" type="text" {...field} placeholder={placeHolder} />
        </FormItem>
    );
};