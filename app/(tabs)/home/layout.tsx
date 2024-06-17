export default function HomeLayOut({children, modal}:{children:React.ReactNode, modal: React.ReactNode}){
    return(
        <>
        {children}
        {modal}
        </>
    )
}