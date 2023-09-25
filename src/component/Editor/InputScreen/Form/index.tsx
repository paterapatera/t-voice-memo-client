import { Dispatch, SetStateAction } from 'react';
import { stringify } from 'yaml';
import Stack from '@mui/material/Stack';
import { useForm } from 'react-hook-form';
import { fileSave } from '@/util/file';
import { EndButton } from "./EndButton";
import { InputField } from "./InputField";
import { TimeField } from "./TimeField";
import { StartButton } from "./StartButton";


export function Form(props: {
    sentences: { [key: string]: string },
    setSentences: Dispatch<SetStateAction<{ [key: string]: string }>>
}) {
    const {
        register,
        handleSubmit,
        setValue,
        getValues,
        watch,
    } = useForm({ defaultValues: { time: "", sentence: "" } });
    const onSubmit = async (data: { time: string, sentence: string }) => {
        const newSentenses = { ...props.sentences, [getValues('time')]: data.sentence }
        props.setSentences(newSentenses)
        await fileSave(stringify(newSentenses))
    }

    return <form onSubmit={handleSubmit(onSubmit)}><Stack spacing={2}>
        <TimeField {...{ register: register('time') }} />
        <InputField {...{ register: register('sentence') }} />
        <Stack direction="row" alignItems="center" spacing={2}>
            <StartButton {...{ setTime: (v: string) => setValue('time', v) }} />
            <EndButton time={watch('time')} />
        </Stack>
    </Stack></form>
}

