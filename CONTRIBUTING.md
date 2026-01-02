# Contributing to CalChildWatch

Thank you for your interest in contributing to CalChildWatch! This project aims to bring transparency to California's childcare subsidy system through open data and citizen journalism.

## Ways to Contribute

### 1. 📊 Data Collection

**File CPRA Requests**
The most impactful contribution is filing California Public Records Act requests for subsidy data in your county.

1. Choose a county from our [tracking spreadsheet](https://github.com/YOUR_USERNAME/calchildwatch/issues/1)
2. Use the templates in `CPRA_TEMPLATES.md`
3. Send requests to the appropriate agencies
4. Share responses with us via GitHub Issues or email

**Scrape Additional Data**
- Help improve the CCLD scraper
- Identify new public data sources
- Clean and validate existing data

### 2. 💻 Development

**Frontend (React)**
- Improve data visualizations
- Add new filtering/search features
- Enhance mobile responsiveness
- Accessibility improvements

**Backend/Scripts (Python)**
- Improve scraper reliability
- Add new data sources
- Build anomaly detection algorithms
- Create data validation tools

**Infrastructure**
- GitHub Actions improvements
- Database optimization
- API development

### 3. 📰 Investigation

**Verify Data**
- Cross-check facility information
- Report inaccuracies
- Suggest anomaly detection criteria

**Investigate Flags**
- Look into flagged facilities
- Document findings
- Connect with local journalists

### 4. 📝 Documentation

- Improve README and guides
- Write tutorials
- Translate to other languages
- Create video walkthroughs

## Getting Started

### Prerequisites

- Node.js 18+
- Python 3.9+ (for scraper)
- Git

### Local Setup

```bash
# Clone the repository
git clone https://github.com/YOUR_USERNAME/calchildwatch.git
cd calchildwatch

# Install Node dependencies
npm install

# Start development server
npm start

# (Optional) Set up Python environment for scraper
cd scripts
python -m venv venv
source venv/bin/activate  # or `venv\Scripts\activate` on Windows
pip install -r requirements.txt
```

### Project Structure

```
calchildwatch/
├── src/                  # React frontend
│   ├── components/       # React components
│   ├── utils/           # Utility functions
│   └── data/            # Static data (county info)
├── scripts/             # Python scraper and tools
├── data/                # Scraped facility data (JSON)
├── .github/workflows/   # CI/CD pipelines
├── public/              # Static assets
└── docs/                # Additional documentation
```

## Development Guidelines

### Code Style

**JavaScript/React**
- Use functional components with hooks
- Follow existing patterns in codebase
- Run `npm run lint` before committing

**Python**
- Follow PEP 8
- Type hints encouraged
- Document functions with docstrings

### Commit Messages

Use conventional commits:
```
feat: add county comparison feature
fix: correct capacity calculation
docs: update CPRA template
chore: update dependencies
```

### Pull Request Process

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/my-feature`)
3. Make your changes
4. Test thoroughly
5. Commit with clear messages
6. Push to your fork
7. Open a Pull Request

**PR Checklist:**
- [ ] Code follows project style
- [ ] Tests pass (if applicable)
- [ ] Documentation updated
- [ ] Screenshots for UI changes
- [ ] No sensitive data committed

## Data Guidelines

### What We Collect

✅ **Public Information Only**
- Facility names and addresses
- License numbers and status
- Inspection history
- Capacity and type
- Subsidy payments to providers (aggregate)

### What We DON'T Collect

❌ **Protected Information**
- Individual family data
- Children's names or information
- Personal income details
- Employee personal data

### Data Quality Standards

- All data must come from official public sources
- Document the source of every dataset
- Include scrape timestamps
- Note any data transformations

## Reporting Issues

### Bug Reports

Include:
- Steps to reproduce
- Expected behavior
- Actual behavior
- Screenshots if applicable
- Browser/OS information

### Feature Requests

Include:
- Clear description of the feature
- Use case / why it's needed
- Mockups if applicable

### Data Issues

Include:
- Facility license number
- What's incorrect
- Correct information (with source)

## Community Guidelines

### Be Respectful
- This is a nonpartisan transparency project
- Focus on data, not politics
- Be constructive in feedback

### Be Careful
- Don't make accusations without evidence
- "Flagged" ≠ "Fraudulent"
- Let the data speak for itself

### Be Collaborative
- Share knowledge and resources
- Help new contributors
- Give credit where due

## Legal Notes

### CPRA Rights

Anyone can file a California Public Records Act request. Key points:
- 10-day response requirement
- Fees may apply for extensive requests
- Some exemptions exist (personnel files, ongoing investigations)
- Denials can be appealed

### Disclaimer

This project provides public data for transparency purposes. Flagged facilities are not accusations of wrongdoing—they are prompts for further investigation by appropriate authorities.

## Contact

- **GitHub Issues**: Best for bugs, features, data issues
- **Discussions**: General questions and ideas
- **Email**: [Project email if applicable]

## Recognition

Contributors will be recognized in:
- README.md contributors section
- Release notes
- Project website (if launched)

---

Thank you for helping bring transparency to California's childcare system! 🌟
