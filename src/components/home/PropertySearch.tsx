import { siteContent } from '../../data/siteContent'
import { Container } from '../layout/Container'

export function PropertySearch() {
  const content = siteContent.search
  return (
    <section id="property-search" className="section search-section" aria-labelledby="search-heading" tabIndex={-1}>
      <Container>
        <div className="search-heading"><div className="stack"><p className="eyebrow">Your next address</p><h2 id="search-heading">{content.title}</h2></div><img src="/images/property-search.jpg" alt="" width="2121" height="1414" loading="lazy" /></div>
        <div className="search-panel">
          <div className="search-panel-heading"><h3>{content.subtitle}</h3><span className="section-note">Preview only</span></div>
          <form aria-label={content.subtitle} aria-describedby="search-status" onSubmit={(event) => event.preventDefault()}>
            <fieldset disabled aria-describedby="search-status"><legend className="visually-hidden">Listing search preview</legend><div className="search-fields">
              <label htmlFor="search-location">Location<select id="search-location" name="location" defaultValue=""><option value="">Choose location</option></select></label>
              <label htmlFor="search-type">Type<select id="search-type" name="type" defaultValue=""><option value="">Property type</option></select></label>
              <label htmlFor="search-sort">Sort By<select id="search-sort" name="sort" defaultValue=""><option value="">Select order</option>{content.sortOptions.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}</select></label>
              <label htmlFor="search-bedrooms">Bedrooms<select id="search-bedrooms" name="bedrooms" defaultValue=""><option value="">Any Number</option><option value="0">Studio</option>{[1, 2, 3, 4, 5, 6].map((count) => <option key={count} value={count}>{count}+</option>)}</select></label>
              <label htmlFor="search-baths">Baths<select id="search-baths" name="baths" defaultValue=""><option value="">Any Number</option>{[1, 2, 3, 4, 5, 6].map((count) => <option key={count} value={count}>{count}+</option>)}</select></label>
              <label htmlFor="search-min-price">Min Price<input id="search-min-price" name="minPrice" type="number" min="0" inputMode="numeric" placeholder="No minimum" /></label>
              <label htmlFor="search-max-price">Max Price<input id="search-max-price" name="maxPrice" type="number" min="0" inputMode="numeric" placeholder="No maximum" /></label>
            </div></fieldset>
          </form>
          <div className="search-footer"><div><p className="eyebrow">{content.action}</p><p id="search-status" className="section-note">{content.unavailable}</p></div><a className="button" href={content.sourceHref}>{content.subtitle}<span aria-hidden="true">↗</span><span className="visually-hidden"> on the original website</span></a></div>
        </div>
      </Container>
    </section>
  )
}
