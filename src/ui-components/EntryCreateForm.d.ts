/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { EscapeHatchProps } from "@aws-amplify/ui-react/internal";
import { GridProps, TextFieldProps } from "@aws-amplify/ui-react";
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type EntryCreateFormInputValues = {
    name?: string;
    value?: number;
};
export declare type EntryCreateFormValidationValues = {
    name?: ValidationFunction<string>;
    value?: ValidationFunction<number>;
};
export declare type FormProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type EntryCreateFormOverridesProps = {
    EntryCreateFormGrid?: FormProps<GridProps>;
    name?: FormProps<TextFieldProps>;
    value?: FormProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type EntryCreateFormProps = React.PropsWithChildren<{
    overrides?: EntryCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: EntryCreateFormInputValues) => EntryCreateFormInputValues;
    onSuccess?: (fields: EntryCreateFormInputValues) => void;
    onError?: (fields: EntryCreateFormInputValues, errorMessage: string) => void;
    onCancel?: () => void;
    onChange?: (fields: EntryCreateFormInputValues) => EntryCreateFormInputValues;
    onValidate?: EntryCreateFormValidationValues;
} & React.CSSProperties>;
export default function EntryCreateForm(props: EntryCreateFormProps): React.ReactElement;
