#!/usr/bin/env python3
"""
Minnesota DHS Licensing Information Scraper for DaycareWatch
Scrapes Minnesota DHS licensing lookup database for childcare facilities.

Usage:
    python scrape_mn_dhs.py --county "Hennepin" --output ../../data/minnesota/
    python scrape_mn_dhs.py --all-counties --output ../../data/minnesota/

Data Source: https://licensinglookup.dhs.state.mn.us/

Note: Minnesota child care licensing structure:
- Child Care Centers: Licensed by DHS directly
- Family Child Care: Licensed by counties (delegated by DHS)
- Group Family Child Care: Licensed by counties
"""

import argparse
import json
import time
import random
import os
from datetime import datetime
from dataclasses import dataclass, asdict
from typing import List, Optional, Dict, Any

try:
    import requests
    from bs4 import BeautifulSoup
except ImportError:
    print("Installing required packages...")
    import subprocess
    subprocess.check_call(['pip', 'install', 'requests', 'beautifulsoup4'])
    import requests
    from bs4 import BeautifulSoup


# Minnesota counties (87 total)
MINNESOTA_COUNTIES = [
    "Aitkin", "Anoka", "Becker", "Beltrami", "Benton", "Big Stone", "Blue Earth",
    "Brown", "Carlton", "Carver", "Cass", "Chippewa", "Chisago", "Clay",
    "Clearwater", "Cook", "Cottonwood", "Crow Wing", "Dakota", "Dodge",
    "Douglas", "Faribault", "Fillmore", "Freeborn", "Goodhue", "Grant",
    "Hennepin", "Houston", "Hubbard", "Isanti", "Itasca", "Jackson",
    "Kanabec", "Kandiyohi", "Kittson", "Koochiching", "Lac qui Parle", "Lake",
    "Lake of the Woods", "Le Sueur", "Lincoln", "Lyon", "Mahnomen", "Marshall",
    "Martin", "McLeod", "Meeker", "Mille Lacs", "Morrison", "Mower",
    "Murray", "Nicollet", "Nobles", "Norman", "Olmsted", "Otter Tail",
    "Pennington", "Pine", "Pipestone", "Polk", "Pope", "Ramsey",
    "Red Lake", "Redwood", "Renville", "Rice", "Rock", "Roseau",
    "Scott", "Sherburne", "Sibley", "St. Louis", "Stearns", "Steele",
    "Stevens", "Swift", "Todd", "Traverse", "Wabasha", "Wadena",
    "Waseca", "Washington", "Watonwan", "Wilkin", "Winona", "Wright",
    "Yellow Medicine"
]

# Facility types in Minnesota
FACILITY_TYPES = [
    ("Child Care Center", "center"),
    ("Family Child Care", "family"),
    ("Group Family Child Care", "group_family"),
]


@dataclass
class Facility:
    """Represents a childcare facility."""
    license_number: str
    name: str
    facility_type: str
    address: str
    city: str
    state: str
    zip_code: str
    county: str
    capacity: int
    status: str
    license_first_date: Optional[str]
    license_expiration_date: Optional[str]
    phone: Optional[str]
    last_inspection_date: Optional[str]
    total_visits: Optional[int]
    total_citations: Optional[int]
    total_complaints: Optional[int]
    scraped_at: str
    dhs_url: str


class MNDHSScraper:
    """Scraper for Minnesota DHS Licensing Information Lookup."""

    # TODO: Verify these URLs by inspecting the actual MN DHS site
    BASE_URL = "https://licensinglookup.dhs.state.mn.us"
    SEARCH_URL = f"{BASE_URL}/Search"

    def __init__(self, delay_range=(1, 3)):
        """
        Initialize scraper.

        Args:
            delay_range: Tuple of (min, max) seconds to wait between requests
        """
        self.session = requests.Session()
        self.session.headers.update({
            'User-Agent': 'DaycareWatch/1.0 (Civic Transparency Project; +https://github.com/daycarewatch)',
            'Accept': 'application/json, text/html, */*',
            'Accept-Language': 'en-US,en;q=0.9',
        })
        self.delay_range = delay_range
        self.stats = {
            'requests': 0,
            'facilities_found': 0,
            'errors': 0
        }

    def _delay(self):
        """Random delay between requests to be respectful."""
        time.sleep(random.uniform(*self.delay_range))

    def search_facilities(
        self,
        county: str,
        facility_type_code: str,
        facility_type_name: str
    ) -> List[Dict[str, Any]]:
        """
        Search for facilities by county and type.

        NOTE: This is a placeholder implementation.
        The actual implementation requires inspecting the MN DHS site
        to understand its API/form structure.

        Args:
            county: County name
            facility_type_code: Facility type code
            facility_type_name: Human-readable facility type

        Returns:
            List of facility dictionaries
        """
        facilities = []

        self._delay()

        try:
            # TODO: Implement actual search logic based on MN DHS site structure
            # This will require:
            # 1. Inspecting the site to find form fields/API endpoints
            # 2. Understanding pagination
            # 3. Parsing the response format

            print(f"  [TODO] Search not yet implemented for MN DHS")
            print(f"  Would search for {facility_type_name} in {county} County")

            self.stats['requests'] += 1

        except Exception as e:
            print(f"  Error searching {county}: {e}")
            self.stats['errors'] += 1

        return facilities

    def scrape_county(
        self,
        county: str,
        include_details: bool = False
    ) -> List[Facility]:
        """
        Scrape all childcare facilities for a county.

        Args:
            county: County name
            include_details: Whether to fetch detailed info for each facility

        Returns:
            List of Facility objects
        """
        print(f"\n{'='*60}")
        print(f"Scraping {county} County, MN")
        print(f"{'='*60}")

        all_facilities = []

        for type_name, type_code in FACILITY_TYPES:
            print(f"\n  Facility Type: {type_name}")
            facilities = self.search_facilities(county, type_code, type_name)

            for facility_data in facilities:
                facility_data['scraped_at'] = datetime.utcnow().isoformat()
                facility = Facility(**facility_data)
                all_facilities.append(facility)

        print(f"\n  Total facilities in {county}: {len(all_facilities)}")
        return all_facilities

    def scrape_all_counties(
        self,
        include_details: bool = False,
        output_dir: str = '../../data/minnesota'
    ) -> Dict[str, List[Facility]]:
        """
        Scrape all Minnesota counties.

        Args:
            include_details: Whether to fetch detailed info
            output_dir: Directory to save county JSON files

        Returns:
            Dictionary mapping county names to facility lists
        """
        all_data = {}

        os.makedirs(output_dir, exist_ok=True)

        for county in MINNESOTA_COUNTIES:
            facilities = self.scrape_county(county, include_details)
            all_data[county] = facilities

            # Save each county immediately
            county_filename = county.lower().replace(' ', '_')
            output_path = os.path.join(output_dir, f"{county_filename}_facilities.json")

            with open(output_path, 'w') as f:
                json.dump(
                    [asdict(f) for f in facilities],
                    f,
                    indent=2
                )
            print(f"  Saved to {output_path}")

        return all_data

    def print_stats(self):
        """Print scraping statistics."""
        print(f"\n{'='*60}")
        print("Scraping Statistics")
        print(f"{'='*60}")
        print(f"Total HTTP requests: {self.stats['requests']}")
        print(f"Total facilities found: {self.stats['facilities_found']}")
        print(f"Total errors: {self.stats['errors']}")


def generate_summary(data_dir: str) -> Dict[str, Any]:
    """Generate a summary of all scraped data."""
    summary = {
        'generated_at': datetime.utcnow().isoformat(),
        'state': 'minnesota',
        'state_name': 'Minnesota',
        'counties': {},
        'totals': {
            'facilities': 0,
            'capacity': 0,
            'by_type': {}
        }
    }

    for filename in os.listdir(data_dir):
        if not filename.endswith('_facilities.json'):
            continue

        filepath = os.path.join(data_dir, filename)
        with open(filepath, 'r') as f:
            facilities = json.load(f)

        county_name = filename.replace('_facilities.json', '').replace('_', ' ').title()

        county_stats = {
            'total_facilities': len(facilities),
            'total_capacity': sum(f.get('capacity', 0) for f in facilities),
            'by_type': {},
            'by_status': {}
        }

        for facility in facilities:
            ftype = facility.get('facility_type', 'Unknown')
            status = facility.get('status', 'Unknown')

            county_stats['by_type'][ftype] = county_stats['by_type'].get(ftype, 0) + 1
            county_stats['by_status'][status] = county_stats['by_status'].get(status, 0) + 1

            summary['totals']['by_type'][ftype] = summary['totals']['by_type'].get(ftype, 0) + 1

        summary['counties'][county_name] = county_stats
        summary['totals']['facilities'] += county_stats['total_facilities']
        summary['totals']['capacity'] += county_stats['total_capacity']

    return summary


def main():
    parser = argparse.ArgumentParser(
        description='Scrape Minnesota DHS childcare facility database'
    )
    parser.add_argument(
        '--county',
        type=str,
        help='Specific county to scrape'
    )
    parser.add_argument(
        '--all-counties',
        action='store_true',
        help='Scrape all Minnesota counties'
    )
    parser.add_argument(
        '--output',
        type=str,
        default='../../data/minnesota',
        help='Output file or directory'
    )
    parser.add_argument(
        '--include-details',
        action='store_true',
        help='Fetch detailed info for each facility (slower)'
    )
    parser.add_argument(
        '--delay-min',
        type=float,
        default=1.0,
        help='Minimum delay between requests (seconds)'
    )
    parser.add_argument(
        '--delay-max',
        type=float,
        default=3.0,
        help='Maximum delay between requests (seconds)'
    )
    parser.add_argument(
        '--generate-summary',
        action='store_true',
        help='Generate summary from existing data files'
    )

    args = parser.parse_args()

    # Just generate summary from existing files
    if args.generate_summary:
        print("Generating summary from existing data...")
        summary = generate_summary(args.output)
        summary_path = os.path.join(args.output, 'summary.json')
        with open(summary_path, 'w') as f:
            json.dump(summary, f, indent=2)
        print(f"Summary saved to {summary_path}")
        print(f"Total facilities: {summary['totals']['facilities']}")
        print(f"Total capacity: {summary['totals']['capacity']}")
        return

    # Initialize scraper
    scraper = MNDHSScraper(delay_range=(args.delay_min, args.delay_max))

    print("\n" + "="*60)
    print("Minnesota DHS Scraper - DaycareWatch")
    print("="*60)
    print("\nNOTE: This scraper is a template and requires implementation")
    print("of the actual MN DHS site structure. See comments in code.")
    print("="*60)

    if args.all_counties:
        # Scrape all counties
        scraper.scrape_all_counties(
            include_details=args.include_details,
            output_dir=args.output
        )

        # Generate summary
        summary = generate_summary(args.output)
        summary_path = os.path.join(args.output, 'summary.json')
        with open(summary_path, 'w') as f:
            json.dump(summary, f, indent=2)

    elif args.county:
        # Scrape single county
        if args.county not in MINNESOTA_COUNTIES:
            print(f"Error: '{args.county}' is not a valid Minnesota county")
            print(f"Valid counties: {', '.join(MINNESOTA_COUNTIES[:10])}...")
            return

        facilities = scraper.scrape_county(
            args.county,
            include_details=args.include_details
        )

        # Determine output path
        os.makedirs(args.output, exist_ok=True)
        county_filename = args.county.lower().replace(' ', '_')
        output_path = os.path.join(args.output, f"{county_filename}_facilities.json")

        with open(output_path, 'w') as f:
            json.dump([asdict(f) for f in facilities], f, indent=2)

        print(f"\nSaved {len(facilities)} facilities to {output_path}")

    else:
        print("Error: Must specify --county or --all-counties")
        parser.print_help()
        return

    scraper.print_stats()


if __name__ == '__main__':
    main()
