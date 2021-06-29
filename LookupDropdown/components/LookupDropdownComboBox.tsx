/* eslint-disable no-use-before-define */
import * as React from 'react'

import { useRef } from 'react'
import { IComboBox, IComboBoxOption } from '@fluentui/react/lib/ComboBox'

import { Stack } from '@fluentui/react/lib/Stack'
import { VirtualizedComboBox } from '@fluentui/react'
import { useRecordsOptions } from '../hooks/useRecords'
import { usePcfContext } from '../services/PcfContext'

// eslint-disable-next-line no-undef
const LookupDropdownComboBox = ():JSX.Element => {
  const comboboxRef = useRef<IComboBox>(null)
  const pcfcontext = usePcfContext()
  // Custom Hook based on react-query
  const { options, isLoading, isError } = useRecordsOptions()

  // EVENTS
  // - When value of combobox changes, callback to PCF
  const onComboboxChanged = (event: React.FormEvent<IComboBox>, option?:IComboBoxOption|undefined, index? : number | undefined) => {
    // vm.setCountrycode!(option?.key.toString()!)
    // vm.onChange(option?.key.toString()!,option?.text!);
  }

  // MAIN RENDERING
  if (isLoading) {
    return <div>Loading...</div>
  } if (isError) {
    return <div>Error fetching data...</div>
  // } if (vm.masked) {
  //   return <MasquedInput/>
  } else {
    return (
            <>
                {options && (
                    <Stack horizontal>

                        <VirtualizedComboBox
                            componentRef={comboboxRef}
                            // onRenderOption={CountryPickerComboBoxOption}
                            onChange={onComboboxChanged}
                            // selectedKey={selectedoption?.key}
                            text='test'
                            allowFreeform={true}
                            autoComplete="on"
                            options={options}
                            style={{ width: '100%' }}
                            disabled={pcfcontext.isReadOnly()}

                        />

                    </Stack>
                )}
            </>
    )
  }
}

export default LookupDropdownComboBox
