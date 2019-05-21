import React from "react";

import { Form, Input } from "antd";
import { FieldProps } from "formik";

import { Connection } from "../../redux/types";

const { TextArea } = Input;

interface InputProps {
    label: string;
    placeHolder?: string;
    onChange?: any
}

type FormValues = Connection;

type InputOwnProps = FieldProps<FormValues> & InputProps;

export const TextAreaField: React.FC<InputOwnProps> = (props: InputOwnProps) => {
    const { label, field, form, placeHolder } = props;
    const { name } = field;
    const { errors } = form as any; // TODO
    const nameKey = name.toString()

    return (
        <Form.Item
            label={label}
            hasFeedback={!!errors[nameKey]}
            validateStatus={errors[nameKey] && "error"}
            help={errors[nameKey]}>
            <TextArea onChange={props.onChange} rows={15} {...field} placeholder={placeHolder} />
        </Form.Item>
    );
};