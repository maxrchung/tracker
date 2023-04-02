/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { Entry } from "../models";
import { EscapeHatchProps } from "@aws-amplify/ui-react/internal";
import { GridProps, TextFieldProps } from "@aws-amplify/ui-react";
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type EntryUpdateFormInputValues = {
    name?: string;
    value?: number;
};
export declare type EntryUpdateFormValidationValues = {
    name?: ValidationFunction<string>;
    value?: ValidationFunction<number>;
};
export declare type FormProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type EntryUpdateFormOverridesProps = {
    EntryUpdateFormGrid?: FormProps<GridProps>;
    name?: FormProps<TextFieldProps>;
    value?: FormProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type EntryUpdateFormProps = React.PropsWithChildren<{
    overrides?: EntryUpdateFormOverridesProps | undefined | null;
} & {
    id?: string;
    entry?: Entry;
    onSubmit?: (fields: EntryUpdateFormInputValues) => EntryUpdateFormInputValues;
    onSuccess?: (fields: EntryUpdateFormInputValues) => void;
    onError?: (fields: EntryUpdateFormInputValues, errorMessage: string) => void;
    onCancel?: () => void;
    onChange?: (fields: EntryUpdateFormInputValues) => EntryUpdateFormInputValues;
    onValidate?: EntryUpdateFormValidationValues;
} & React.CSSProperties>;
export default function EntryUpdateForm(props: EntryUpdateFormProps): React.ReactElement;
