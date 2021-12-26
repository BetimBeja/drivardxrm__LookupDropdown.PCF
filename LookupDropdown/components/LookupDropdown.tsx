/* eslint-disable no-use-before-define */
import * as React from 'react'
import { useRef } from 'react'
import { Stack } from '@fluentui/react/lib/Stack'
import { usePcfContext } from '../services/PcfContext'
import OpenRecordButton from './OpenRecordButton'
import { Dropdown, IDropdownOption, IDropdown } from '@fluentui/react/lib/Dropdown'
import { ImageIcon } from '@fluentui/react/lib/Icon'
import { useRecordsAsOptions } from '../hooks/useRecords'
import { dropdownIconOptionstyle, dropdownIcontitlestyle, dropdownStyles, dropdownTextstyle, dropdownTheme } from '../styles/DropdownStyles'
import MasquedInput from './MaskedInput'
export interface ILookupDropdownProps{
  entity: string;
}

// eslint-disable-next-line no-undef
const LookupDropdown = ():JSX.Element => {
  const dropdownRef = useRef<IDropdown>(null)
  const pcfcontext = usePcfContext()
  // Custom Hook based on react-query
  const { options, isLoading, isError } = useRecordsAsOptions()

  // EVENTS
  // - When value of combobox changes, callback to PCF
  const onDropdownChanged = (event: React.FormEvent<HTMLDivElement>, option?:IDropdownOption<any>|undefined, index? : number | undefined) => {
    let lookupvalue
    if (option === undefined || option.key === -1) {
      lookupvalue = undefined
    } else {
      lookupvalue = [{ id: option.key.toString(), name: option.text, entityType: pcfcontext.lookupentityname }]
    }

    pcfcontext.onChange(lookupvalue)
  }

  // eslint-disable-next-line no-undef
  const onRenderOption = (option: IDropdownOption | undefined): JSX.Element => {
    return (
      <div style={dropdownTextstyle}>
        {pcfcontext.showRecordImage() && option && option.data && (
          <ImageIcon
            style={dropdownIconOptionstyle}
            imageProps={{
              src: option.data.imagesrc,
              width: 25,
              height: 25
            }}
          />
        )}
        {option && option.text && (
          <span>{option.text}</span>
        )}
      </div>
    )
  }

  // eslint-disable-next-line no-undef
  const onRenderTitle = (options: IDropdownOption[] | undefined): JSX.Element => {
    const option = options![0]
    return (
      <div style={dropdownTextstyle}>
        {pcfcontext.showRecordImage() && option && option.data && option.data.imagesrc && (
          <ImageIcon
            style={dropdownIcontitlestyle}
            imageProps={{
              src: option.data.imagesrc,
              width: 25,
              height: 25
            }}
          />
        )}
        {option && option.text && (
          <span>{option.text}</span>
        )}
      </div>
    )
  }

  // MAIN RENDERING
  if (isLoading) {
    return <div>Loading...</div>
  } if (isError) {
    return <div>Error fetching data...</div>
  } if (pcfcontext.isMasked()) {
    return <MasquedInput/>
  } else {
    return (
      <>
        {options && (
          <Stack horizontal>
            <Stack.Item grow={9}>
              <Dropdown
                placeholder="---"
                componentRef={dropdownRef}
                onRenderTitle={onRenderTitle}
                onRenderOption={onRenderOption}
                onChange={onDropdownChanged}
                selectedKey={pcfcontext.selectedValue?.id ?? ''}
                options={options}
                styles = {dropdownStyles}
                theme = {dropdownTheme}
                disabled={pcfcontext.isReadOnly()}
              />
            </Stack.Item>
            {pcfcontext.context.parameters.showOpenRecordButton.raw === 'true' && (
              <Stack.Item grow>
                <OpenRecordButton/>
              </Stack.Item>
            )}
          </Stack>
        )}
      </>
    )
  }
}

export default LookupDropdown