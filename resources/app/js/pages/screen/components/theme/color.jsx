import ColorPicker from "react-best-gradient-color-picker";

export default function Component({ value, onChange }) {
    return <ColorPicker value={value} onChange={onChange} />;
}
