import type { IInputs, IOutputs } from "../LookupDropdown/generated/ManifestTypes";

import {
  AttributeType,
  ComponentFrameworkMockGenerator,
  EnumPropertyMock,
  LookupPropertyMock,
  ShkoOnline,
  StringPropertyMock,
} from "@shko.online/componentframework-mock";

import { LookupDropdown as Component } from "../LookupDropdown/index";
import { useArgs, useEffect } from "@storybook/preview-api";
import { ImgBetim, ImgDavid } from "./mock/EntityImages";

export interface StoryArgs {
  customselecttext: string;
  customtext: string;
  dependentlookupfield: ComponentFramework.LookupValue;
  lookupfield: ComponentFramework.LookupValue;
  showOpenRecordButton: boolean;
  showRecordImage: boolean;
}

export const renderGenerator = () => {
  let container: HTMLDivElement | null;
  let mockGenerator: ComponentFrameworkMockGenerator<IInputs, IOutputs>;

  return function () {
    const [args, updateArgs] = useArgs<StoryArgs>();
    useEffect(() => () => {
      container = null;
      mockGenerator.control.destroy();
    }, []);
    if (!container) {
      container = document.createElement("div");
      mockGenerator = new ComponentFrameworkMockGenerator(
        Component,
        {
          customselecttext: StringPropertyMock,
          customtext: StringPropertyMock,
          dependentlookupfield: LookupPropertyMock,
          lookupfield: LookupPropertyMock,
          showOpenRecordButton: EnumPropertyMock<"false" | "true">,
          showRecordImage: EnumPropertyMock<"false" | "true">,
        },
        container
      );

      mockGenerator.metadata.initMetadata([
        {
          LogicalName: "contact",
          SchemaName: "Contact",
          EntitySetName: "contacts",
          PrimaryIdAttribute: "contactid",
          PrimaryNameAttribute: "fullname",
          PrimaryImageAttribute: "entityimage",
          ManyToOneRelationships: [],
          OneToManyRelationships: [],
          Attributes: [
            {
              AttributeType: AttributeType.Uniqueidentifier,
              SchemaName: "ContactId",
              LogicalName: "contactid"
            } as ShkoOnline.AttributeMetadata,
            {
              AttributeType: AttributeType.String,
              SchemaName: "FullName",
              LogicalName: "fullname"
            } as ShkoOnline.StringAttributeMetadata,
            {
              AttributeType: AttributeType.String,
              SchemaName: "EntityImage",
              LogicalName: "entityimage"
            } as ShkoOnline.AttributeMetadata,
            {
              AttributeType: AttributeType.String,
              SchemaName: "Country",
              LogicalName: "country"
            } as ShkoOnline.StringAttributeMetadata,
          ]
        } as ShkoOnline.EntityMetadata,
        {
          LogicalName: 'savedquery',
          SchemaName: 'SavedQuery',
          EntitySetName: 'savedqueries',
          Attributes: [
            {
              AttributeType: AttributeType.String,
              SchemaName: "ReturnedTypeCode",
              LogicalName: "returnedtypecode"
            } as ShkoOnline.StringAttributeMetadata,
            {
              AttributeType: AttributeType.String,
              SchemaName: "FetchXML",
              LogicalName: "fetchxml"
            } as ShkoOnline.StringAttributeMetadata,
          ]
        } as ShkoOnline.EntityMetadata
      ]);

      mockGenerator.metadata.initItems({
        "@odata.context": '#contacts',
        value: [
          {
            contactid: "1",
            fullname: "Betim Beja",
            country: "Albania",
            entityimage: ImgBetim,
          },
          {
            contactid: "2",
            fullname: "David Rivard",
            country: "Canada",
            entityimage: ImgDavid,
          },
        ]
      });

      mockGenerator.metadata.initItems({
        "@odata.context": '#savedqueries',
        value: [
          {
            savedqueriesid: "1",
            returnedtypecode: "contact",
            fetchxml: `<fetch>
            <entity name="contact">
            <attribute name="contactid" />
            <attribute name="fullname" />
            <attribute name="entityimage" />
            <attribute name="country" />
            </entity>
          </fetch>`
          },
        ]
      });

      mockGenerator.context._parameters.lookupfield.security = {
        editable: true,
        readable: true,
        secured: false,
      };

      mockGenerator.context._parameters.lookupfield.getViewId.returns(
        mockGenerator.metadata.GetAllRows('savedquery').rows[0]['savedqueryid']
      );

      mockGenerator.onOutputChanged.callsFake(() => {
        const { dependentlookupfield, lookupfield } =
          mockGenerator.control.getOutputs?.() || {};
        updateArgs({
          lookupfield: lookupfield?.[0],
          dependentlookupfield: dependentlookupfield?.[0],
        });
      });

      mockGenerator.context._SetCanvasItems({
        lookupfield: args.lookupfield,
        customselecttext: args.customselecttext,
        customtext: args.customtext,
      });

      mockGenerator.ExecuteInit();
    }

    if (mockGenerator) {
      mockGenerator.context._parameters.customselecttext._SetValue(
        args.customselecttext
      );
      mockGenerator.context._parameters.customtext._SetValue(args.customtext);
      mockGenerator.context._parameters.dependentlookupfield._SetValue(
        args.dependentlookupfield
      );
      mockGenerator.context._parameters.lookupfield._SetValue(args.lookupfield);
      mockGenerator.context._parameters.showOpenRecordButton._SetValue(
        args.showOpenRecordButton ? "true" : "false"
      );
      mockGenerator.context._parameters.showRecordImage._SetValue(
        args.showRecordImage ? "true" : "false"
      );
      mockGenerator.ExecuteUpdateView();
    }

    return container;
  };
};