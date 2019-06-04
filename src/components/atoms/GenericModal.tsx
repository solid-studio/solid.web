import React from "react"
import * as R from "ramda";

import { Modal, Button } from "antd";
import { Formik, FormikErrors, FormikProps } from "formik";

const FORM_TITLE = "ItemForm";

interface Props<FormFields> {
    FormComponent: React.ComponentType<FormComponentProps<FormFields>>;
    initialValues: FormFields;
    visible: boolean;
    onCancel: () => void
    loading: boolean;
    validator: (item: FormFields) => FormikErrors<FormFields>
    onSubmit: (item: FormFields) => void // TODO
    title: string
    disableSubmitButton?: boolean
    buttonText?: string
}

type FormComponentProps<FormFields> = { fields: FormFields } & Handlers<
    FormFields
>;

type OnChangeHandler<FormFields> = <K extends keyof FormFields>(
    s: K,
    a: FormFields[K]
) => void;

interface Handlers<FormFields> {
    onSubmit: (e?: React.FormEvent<HTMLFormElement> | undefined) => void
}

interface State<FormFields> {
    fields: FormFields;
}

class GenericModal<FormFields> extends React.Component<Props<FormFields>, State<FormFields>> {
    constructor(props: Props<FormFields>) {
        super(props);
        this.state = { fields: props.initialValues };
    }

    public onChange: OnChangeHandler<FormFields> = (field, value) => {
        const result = R.merge(this.state.fields, { [field]: value }) as any
        this.setState({
            fields: result
        });
    };

    submit = (values: FormFields) => {
        console.log("Submitting", values)
        this.props.onSubmit(values);
    }

    public render() {
        const { FormComponent, visible, onCancel, loading, validator, title, disableSubmitButton } = this.props;
        const { fields } = this.state;
        return (

            <Modal
                width={500}
                visible={visible}
                title={title} // TODO change title if it is edit or creation mode
                onCancel={onCancel}
                footer={[<Button key="cancel" onClick={onCancel}>Cancel</Button>,
                <Button
                    form={FORM_TITLE}
                    key="submit"
                    htmlType="submit"
                    type="primary"
                    disabled={disableSubmitButton || false}
                    loading={loading}>{this.props.buttonText || "Save"}</Button>]}>
                <div>
                    <Formik
                        initialValues={fields}
                        onSubmit={this.submit}
                        enableReinitialize={true}
                        validate={validator}
                        render={({
                            handleSubmit
                        }: FormikProps<FormFields>) => (
                                <FormComponent onSubmit={handleSubmit} fields={fields} />
                            )}
                    />
                </div>

            </Modal>)
    }
}
export default GenericModal;

