import css from "./SearchBox.module.css";

interface SearchBoxProps {
  onSubmit: (query: string) => void
  value : string
}

export default function SearchBox({ onSubmit, value }: SearchBoxProps) {
  return <input className={css.input} type="text" placeholder="Search posts" onChange={(e) => onSubmit(e.target.value)} defaultValue={value}/>;
}
