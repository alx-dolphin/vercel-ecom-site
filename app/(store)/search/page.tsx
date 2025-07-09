async function SearchPage({
    searchParams,
}: {
    searchParams: Promise<{ query: string }>
}) {
    const { query } = await searchParams;
    return (
        <div>SearchPage for {query}</div>
    )
}

export default SearchPage; 