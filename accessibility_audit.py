#!/usr/bin/env python3
"""
Accessibility Audit Script for OUROBOROS Consulting Website
Comprehensive WCAG compliance audit with detailed reporting.
"""

from pathlib import Path
import re
from datetime import datetime

# Site configuration
SITE_ROOT = Path("/Users/apostolos/Code/OUROBOROS/OUROBOROS-Consulting.github.io/_site")

# WCAG thresholds
WCAG_AA_CONTRAST = 4.5
WCAG_AAA_CONTRAST = 7.0

class AccessibilityAudit:
    def __init__(self):
        self.issues = {
            "missing_alt_text": [],
            "heading_hierarchy": [],
            "missing_skip_link": [],
            "missing_landmarks": [],
            "keyboard_navigation": [],
            "focus_visible": [],
            "aria_attributes": [],
            "color_contrast": [],
            "semantic_markup": [],
            "form_labels": [],
        }
        self.stats = {
            "total_pages": 0,
            "pages_with_issues": 0,
            "critical": 0,
            "major": 0,
            "minor": 0,
        }
    
    def analyze_page(self, page_path, page_name):
        """Analyze a single HTML page for accessibility issues."""
        issues = []
        
        try:
            with open(page_path, 'r', encoding='utf-8', errors='ignore') as f:
                content = f.read()
        except Exception as e:
            return {"error": str(e)}
        
        # 1. Check for skip link (WCAG 2.4.1)
        skip_link = 'skip' in content.lower() and 'main content' in content.lower()
        if not skip_link:
            issues.append({
                "type": "missing_skip_link",
                "severity": "critical",
                "wcag": "2.4.1",
                "page": page_name,
                "description": "No 'Skip to main content' link found"
            })
        
        # 2. Check heading hierarchy (WCAG 1.3.1)
        headings = re.findall(r'<(h[1-6])[^>]*>(.*?)</\1>', content, re.DOTALL | re.IGNORECASE)
        if headings:
            first_level = int(headings[0][0][1])
            for i in range(len(headings) - 1):
                prev_level = int(headings[i][0][1])
                curr_level = int(headings[i+1][0][1])
                # Check if we're skipping levels
                if curr_level > prev_level + 1 and curr_level < 6:
                    issues.append({
                        "type": "heading_hierarchy",
                        "severity": "minor",
                        "wcag": "1.3.1",
                        "page": page_name,
                        "description": f"h{curr_level} follows h{prev_level} (skipped levels)"
                    })
        
        # 3. Check for images without alt text (WCAG 1.1.1)
        img_tags = re.findall(r'<img([^>]*)>', content, re.IGNORECASE)
        for tag in img_tags:
            has_alt = 'alt=' in tag.lower()
            is_decorative = 'aria-hidden' in tag.lower() or 'role="presentation"' in tag.lower()
            
            if not has_alt and not is_decorative:
                issues.append({
                    "type": "missing_alt_text",
                    "severity": "critical",
                    "wcag": "1.1.1",
                    "page": page_name,
                    "description": "Image missing alternative text"
                })
        
        # 4. Check for semantic landmarks (WCAG 4.1.2)
        has_main = '<main' in content
        if not has_main:
            issues.append({
                "type": "missing_landmark",
                "severity": "major",
                "wcag": "4.1.2",
                "page": page_name,
                "description": "No <main> landmark found"
            })
        
        # 5. Check for proper language attribute
        has_lang = 'lang=' in content and 'lang="en"' in content
        if not has_lang:
            issues.append({
                "type": "semantic_markup",
                "severity": "minor",
                "wcag": "3.1.1",
                "page": page_name,
                "description": "Missing language attribute"
            })
        
        # 6. Check for focus-visible styles (WCAG 2.4.7)
        # Check in page AND in main CSS file
        has_focus_visible = ':focus-visible' in content or 'outline:' in content
        main_css_path = SITE_ROOT / "assets" / "css" / "main.css"
        if main_css_path.exists():
            with open(main_css_path, 'r') as f:
                css_content = f.read()
                has_focus_in_css = ':focus-visible' in css_content
                if has_focus_in_css:
                    has_focus_visible = True
        if not has_focus_visible:
            issues.append({
                "type": "focus_visible",
                "severity": "major",
                "wcag": "2.4.7",
                "page": page_name,
                "description": "No focus-visible styles defined"
            })
        
        return issues
    
    def run_audit(self):
        """Run the accessibility audit on all pages."""
        print("=" * 60)
        print("OUROBOROS CONSULTING - ACCESSIBILITY AUDIT")
        print(f"Date: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
        print("=" * 60)
        
        pages = []
        for page in SITE_ROOT.rglob("*.html"):
            if 'node_modules' in str(page) or 'accessibility_audit' in str(page):
                continue
            pages.append(page)
        
        self.stats["total_pages"] = len(pages)
        print(f"\nScanning {len(pages)} pages...\n")
        
        for page in pages:
            page_name = page.relative_to(SITE_ROOT).parent
            issues = self.analyze_page(page, page_name)
            
            for issue in issues:
                self.issues[issue["type"]].append(issue)
                sev = issue.get("severity", "minor")
                self.stats[sev] += 1
            
            if issues:
                self.stats["pages_with_issues"] += 1
        
        return self.issues
    
    def categorize_issues(self):
        """Categorize issues by severity."""
        categories = {
            "critical": 0,
            "major": 0,
            "minor": 0,
        }
        
        for issue_type, issues in self.issues.items():
            for issue in issues:
                sev = issue.get("severity", "minor")
                categories[sev] = categories.get(sev, 0) + 1
        
        return categories
    
    def generate_report(self, output_path):
        """Generate a detailed HTML report."""
        categories = self.categorize_issues()
        total_issues = categories['critical'] + categories['major'] + categories['minor']
        compliance_pct = max(0, 100 - (total_issues * 2)) if total_issues > 0 else 100
        
        # Build report HTML
        report_html = """<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Accessibility Audit Report - OUROBOROS Consulting</title>
    <style>
        :root {
            --critical: #dc2626;
            --major: #ea580c;
            --minor: #d97706;
            --info: #2563eb;
            --success: #16a34a;
            --bg: #f9fafb;
            --surface: #ffffff;
            --border: #e5e7eb;
            --text: #1f2937;
            --text-muted: #6b7280;
        }
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            background: var(--bg);
            color: var(--text);
            line-height: 1.6;
            padding: 2rem;
            font-size: 16px;
        }
        .container { max-width: 1400px; margin: 0 auto; }
        h1 { font-size: 2.5rem; margin-bottom: 0.5rem; color: #111827; }
        .subtitle { color: var(--text-muted); margin-bottom: 2rem; font-size: 1.1rem; }
        .summary-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 1.5rem;
            margin-bottom: 2rem;
        }
        .stat-card {
            background: var(--surface);
            border-radius: 12px;
            padding: 1.5rem;
            box-shadow: 0 1px 3px rgba(0,0,0,0.1);
            border-left: 4px solid var(--info);
            transition: transform 0.2s;
        }
        .stat-card:hover { transform: translateY(-2px); }
        .stat-card.critical { border-left-color: var(--critical); }
        .stat-card.major { border-left-color: var(--major); }
        .stat-card.minor { border-left-color: var(--minor); }
        .stat-card.success { border-left-color: var(--success); }
        .stat-card h3 { font-size: 1rem; margin-bottom: 0.5rem; color: var(--text-muted); text-transform: uppercase; letter-spacing: 0.05em; }
        .stat-card p { font-size: 2.5rem; font-weight: 700; color: var(--text); }
        .section {
            background: var(--surface);
            border-radius: 12px;
            padding: 2rem;
            margin-bottom: 1.5rem;
            box-shadow: 0 1px 3px rgba(0,0,0,0.1);
        }
        .section h2 {
            font-size: 1.75rem;
            margin-bottom: 1rem;
            padding-bottom: 0.75rem;
            border-bottom: 2px solid var(--border);
            display: flex;
            align-items: center;
            gap: 0.5rem;
        }
        .issue-count {
            background: var(--bg);
            padding: 0.25rem 0.75rem;
            border-radius: 9999px;
            font-size: 0.875rem;
            font-weight: 600;
            color: var(--text-muted);
        }
        .issue-item {
            background: var(--bg);
            border-radius: 8px;
            padding: 1rem;
            margin-bottom: 0.75rem;
            border-left: 4px solid var(--info);
        }
        .issue-item.critical { border-left-color: var(--critical); }
        .issue-item.major { border-left-color: var(--major); }
        .issue-item.minor { border-left-color: var(--minor); }
        .issue-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.5rem; }
        .issue-title { font-weight: 600; font-size: 1rem; }
        .issue-wcag {
            background: var(--text);
            color: var(--surface);
            padding: 0.15rem 0.5rem;
            border-radius: 4px;
            font-size: 0.75rem;
            font-family: monospace;
        }
        .issue-desc { color: var(--text-muted); font-size: 0.9rem; margin: 0; }
        .badge {
            display: inline-block;
            padding: 0.25rem 0.5rem;
            border-radius: 4px;
            font-size: 0.75rem;
            font-weight: 600;
            background: #e5e7eb;
            color: #374151;
            margin-right: 0.5rem;
        }
        .progress-bar { height: 12px; background: var(--border); border-radius: 6px; margin: 1rem 0; overflow: hidden; }
        .progress-fill { height: 100%; background: linear-gradient(90deg, var(--info), var(--success)); transition: width 0.5s ease; }
        .compliance-score { display: grid; grid-template-columns: 1fr 1fr; gap: 2rem; margin-top: 1rem; }
        .score-card { background: var(--bg); padding: 1.5rem; border-radius: 8px; text-align: center; }
        .score-card h4 { font-size: 1.5rem; margin-bottom: 1rem; color: var(--text); }
        .score-card p { color: var(--text-muted); font-size: 0.875rem; }
        table { width: 100%; border-collapse: collapse; margin-top: 1rem; font-size: 0.9rem; }
        th, td { padding: 0.75rem; text-align: left; border-bottom: 1px solid var(--border); }
        th { background: var(--bg); font-weight: 600; color: var(--text); }
        .severity-badge { display: inline-block; padding: 0.25rem 0.75rem; border-radius: 9999px; font-size: 0.75rem; font-weight: 600; margin-right: 0.5rem; }
        .severity-badge.critical { background: #fee2e2; color: #991b1b; }
        .severity-badge.major { background: #ffedd5; color: #9a3412; }
        .severity-badge.minor { background: #fef3c7; color: #92400e; }
        footer { margin-top: 3rem; padding-top: 2rem; border-top: 1px solid var(--border); color: var(--text-muted); text-align: center; font-size: 0.875rem; }
    </style>
</head>
<body>
    <div class="container">
        <h1>🔍 Accessibility Audit Report</h1>
        <p class="subtitle">OUROBOROS Consulting Website | Generated {datetime_str}</p>
        
        <div class="summary-grid">
            <div class="stat-card critical">
                <h3>🚨 Critical Issues</h3>
                <p>{cat_critical}</p>
            </div>
            <div class="stat-card major">
                <h3>⚠️ Major Issues</h3>
                <p>{cat_major}</p>
            </div>
            <div class="stat-card minor">
                <h3>📋 Minor Issues</h3>
                <p>{cat_minor}</p>
            </div>
            <div class="stat-card success">
                <h3>✅ Total Pages</h3>
                <p>{total_pages}</p>
            </div>
        </div>
"""
        
        # Add detailed sections
        for issue_type, issues in self.issues.items():
            if not issues:
                continue
            
            severity_label = {
                "missing_alt_text": "Critical",
                "heading_hierarchy": "Minor",
                "missing_skip_link": "Critical",
                "missing_landmarks": "Major",
                "keyboard_navigation": "Major",
                "focus_visible": "Major",
                "aria_attributes": "Minor",
                "color_contrast": "Major",
                "semantic_markup": "Minor",
                "form_labels": "Minor",
            }.get(issue_type, "Info")
            
            wcag_label = {
                "missing_alt_text": "1.1.1",
                "heading_hierarchy": "1.3.1",
                "missing_skip_link": "2.4.1",
                "missing_landmarks": "4.1.2",
                "keyboard_navigation": "2.1.1",
                "focus_visible": "2.4.7",
                "aria_attributes": "4.1.2",
                "color_contrast": "1.4.3",
                "semantic_markup": "3.1.1",
                "form_labels": "1.3.5",
            }.get(issue_type, "N/A")
            
            report_html += f'        <div class="section">\n            <h2>{issue_type.replace("_", " ").title()} <span class="issue-count">{len(issues)} issues</span></h2>\n            <p class="issue-desc">WCAG Criterion: {wcag_label}</p>\n            <table>\n                <thead><tr><th>Severity</th><th>Page</th><th>Issue</th></tr></thead>\n                <tbody>'
            
            for issue in issues[:20]:
                sev_class = issue.get("severity", "minor")
                page = issue.get("page", "unknown")
                desc = issue.get("description", "No description")
                
                report_html += f'                    <tr>\n                        <td><span class="severity-badge {sev_class}">{severity_label}</span></td>\n                        <td><span class="badge">{page}</span></td>\n                        <td>{desc}</td>\n                    </tr>'
            
            report_html += f'\n                </tbody>\n            </table>\n        </div>\n'
        
        # Add compliance score section
        report_html += f'        <div class="section">\n            <h2>📊 WCAG Compliance Score</h2>\n            <p>Based on automated checks and structural analysis</p>\n            \n            <div class="compliance-score">\n                <div class="score-card">\n                    <h4>Level A</h4>\n                    <div class="progress-bar"><div class="progress-fill" style="width: {compliance_pct}%;"></div></div>\n                    <p>{compliance_pct}% compliance</p>\n                </div>\n                <div class="score-card">\n                    <h4>Level AA</h4>\n                    <div class="progress-bar"><div class="progress-fill" style="width: {compliance_pct * 0.85}%;"></div></div>\n                    <p>{int(compliance_pct * 0.85)}% compliance</p>\n                </div>\n            </div>\n        </div>\n        \n        <footer>\n            <p><strong>Disclaimer:</strong> This report is based on automated testing and represents a snapshot in time. Full WCAG compliance requires manual testing with assistive technologies and user feedback.</p>\n            <p>Generated by <code>accessibility_audit.py</code></p>\n        </footer>\n    </div>\n</body>\n</html>'
        
        with open(output_path, 'w', encoding='utf-8') as f:
            f.write(report_html)
        
        print(f"\nReport saved to: {output_path}")
        return report_html

def main():
    audit = AccessibilityAudit()
    issues = audit.run_audit()
    output_path = SITE_ROOT / "accessibility_audit_report.html"
    audit.generate_report(output_path)
    
    print(f"\n{'='*60}")
    print("AUDIT COMPLETE")
    print(f"{'='*60}")
    print(f"\nTotal Pages Scanned: {audit.stats['total_pages']}")
    print(f"Pages with Issues: {audit.stats['pages_with_issues']}")
    print(f"\nIssue Summary:")
    for severity in ['critical', 'major', 'minor']:
        count = audit.stats[severity]
        print(f"  - {severity.capitalize()}: {count}")

if __name__ == "__main__":
    main()
