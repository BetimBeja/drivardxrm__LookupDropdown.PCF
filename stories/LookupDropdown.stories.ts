import type { Meta, StoryObj } from "@storybook/html";
import { StoryArgs, renderGenerator } from "./LookupDropdown.renderGenerator";

export default {
  title: "Lookup Dropdown",
  decorators: [
    (Story) => {
      const container = document.createElement("div");
      container.style.margin = "2em";
      container.style.padding = "1em";
      container.style.maxWidth = "350px";
      container.style.border = "dotted 1px";

      const storyResult = Story();

      if (typeof storyResult == "string") {
        container.innerHTML = storyResult;
      } else {
        container.appendChild(storyResult);
      }
      return container;
    },
  ],
  parameters: {
    // More on Story layout: https://storybook.js.org/docs/html/configure/story-layout
    layout: "fullscreen",
    controls: { expanded: true }
  },
  // More on argTypes: https://storybook.js.org/docs/html/api/argtypes
  argTypes: {
    isDisabled: {
      name: "Disabled",
      control: "boolean",
      table: {
        category: "Mode",
        defaultValue: { summary: "false" },
      },
    },
    isVisible: {
      name: "Visible",
      control: "boolean",
      table: {
        category: "Mode",
        defaultValue: { summary: "true" },
      },
    },
    customselecttext: {
      name: "Custom Select Text",
      control: "text",
      table: {
        category: "Parameters",
      },
    },
    customtext: {
      name: "Custom Text",
      control: "text",
      table: {
        category: "Parameters",
      },
    },
    showOpenRecordButton: {
      name: "Show Open Record",
      control: "boolean",
      table: {
        category: "Parameters",
      },
    },
    showRecordImage: {
      name: "Show Record Image",
      control: "boolean",
      table: {
        category: "Parameters",
      },
    },
  },
  args: {
    isVisible: true,
    isDisabled: false,
  },
} as Meta<StoryArgs>;

export const Primary = {
  render: renderGenerator(),
  args: {
    customselecttext: "Custom Select",
    customtext: undefined,
    showOpenRecordButton: true,
    showRecordImage: true,
  },
} as StoryObj<StoryArgs>;

export const CustomText = {
  render: renderGenerator(),
  args: {
    customselecttext: "Custom Select",
    customtext: "{fullname} - {country} - MVP",
    showOpenRecordButton: true,
    showRecordImage: true,
  },
} as StoryObj<StoryArgs>;

export const Selected = {
  render: renderGenerator(),
  args: {
    lookupfield: {
      name: "David Rivard",
      id: "2",
      entityType: "contact",
    },
    customselecttext: "Custom Select",
    customtext: undefined,
    showOpenRecordButton: true,
    showRecordImage: true,
  },
} as StoryObj<StoryArgs>;

export const LongText = {
  render: renderGenerator(),
  args: {
    customselecttext: "Custom Select",
    customtext:
      "{fullname} - {country} - MVP | and a very long text to test the control",
    showOpenRecordButton: true,
    showRecordImage: true,
  },
} as StoryObj<StoryArgs>;
