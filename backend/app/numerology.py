"""
Numerology calculation engine.
Implements Pythagorean numerology system for Life Path and Destiny numbers.
"""

# Pythagorean number mapping for letters
LETTER_VALUES = {
    'a': 1, 'b': 2, 'c': 3, 'd': 4, 'e': 5, 'f': 6, 'g': 7, 'h': 8, 'i': 9,
    'j': 1, 'k': 2, 'l': 3, 'm': 4, 'n': 5, 'o': 6, 'p': 7, 'q': 8, 'r': 9,
    's': 1, 't': 2, 'u': 3, 'v': 4, 'w': 5, 'x': 6, 'y': 7, 'z': 8
}

# Master numbers (not reduced further)
MASTER_NUMBERS = {11, 22, 33}


def _reduce_to_single(num: int) -> int:
    """Reduce a number to single digit, preserving master numbers."""
    while num > 9 and num not in MASTER_NUMBERS:
        num = sum(int(d) for d in str(num))
    return num


def calculate_life_path_number(day: int, month: int, year: int) -> int:
    """
    Calculate Life Path Number from date of birth.
    Uses the three-step reduction method (reduce day, month, year separately first).
    """
    reduced_day = _reduce_to_single(day)
    reduced_month = _reduce_to_single(month)
    reduced_year = _reduce_to_single(year)
    
    return _reduce_to_single(reduced_day + reduced_month + reduced_year)


def calculate_destiny_number(name: str) -> int:
    """
    Calculate Destiny/Expression Number from full name.
    Uses Pythagorean letter-to-number mapping.
    """
    total = sum(LETTER_VALUES.get(c.lower(), 0) for c in name)
    return _reduce_to_single(total)


# Interpretation texts for each number
PERSONALITY_TRAITS = {
    1: "You are a natural-born leader with strong independence and determination. Your innovative thinking and self-reliance make you a pioneer in whatever field you choose.",
    2: "You possess a gentle, diplomatic nature with exceptional intuition. Your ability to see both sides of any situation makes you an excellent mediator and peacemaker.",
    3: "Your creativity and self-expression are your greatest gifts. You have a natural talent for communication and inspire others with your optimism and artistic vision.",
    4: "You are practical, organized, and dependable. Your strong work ethic and attention to detail create solid foundations for lasting success.",
    5: "Freedom and adventure drive your spirit. Your adaptability and curiosity lead you to diverse experiences that enrich your understanding of life.",
    6: "You are nurturing, responsible, and family-oriented. Your sense of duty and ability to create harmony make you a pillar of support for those around you.",
    7: "You possess deep wisdom and analytical abilities. Your spiritual nature and quest for truth lead you to profound insights and understanding.",
    8: "You have natural business acumen and leadership abilities. Your ambition and organizational skills position you for material and professional success.",
    9: "You are compassionate, humanitarian, and selfless. Your wisdom and universal love inspire you to make a positive difference in the world.",
    11: "As a Master Number 11, you have heightened intuition and spiritual insight. You are a visionary with the potential to inspire and uplift humanity.",
    22: "As a Master Number 22, you are the Master Builder with extraordinary potential to turn dreams into reality on a grand scale.",
    33: "As a Master Number 33, you embody the Master Teacher energy with profound compassion and the ability to heal and guide others.",
}

CAREER_INSIGHTS = {
    1: "Leadership roles, entrepreneurship, and independent ventures suit you best. Consider careers in management, innovation, or starting your own business.",
    2: "Collaborative environments where you can use your diplomatic skills thrive. Consider counseling, human resources, or creative partnerships.",
    3: "Creative fields and communication-based careers align with your talents. Explore writing, performing arts, marketing, or teaching.",
    4: "Structured careers with clear progression suit your nature. Engineering, architecture, finance, or project management are excellent choices.",
    5: "Dynamic careers with variety and travel appeal to you. Sales, journalism, travel industry, or consulting offer the freedom you crave.",
    6: "Helping professions and creative arts resonate with you. Healthcare, education, design, or family counseling are fulfilling paths.",
    7: "Research, analysis, and spiritual pursuits match your depth. Academia, science, technology, or wellness industries are ideal.",
    8: "Business, finance, and executive roles harness your abilities. Corporate leadership, investment, or entrepreneurship bring success.",
    9: "Humanitarian work and creative expression fulfill you. Non-profits, arts, healing professions, or international work bring meaning.",
    11: "Spiritual teaching, counseling, and inspirational leadership align with your higher calling. The creative arts and metaphysical fields suit you.",
    22: "Large-scale projects, architecture, politics, or international business allow you to manifest your grand visions.",
    33: "Teaching, healing arts, counseling, and humanitarian leadership let you express your nurturing mastery.",
}

RELATIONSHIP_INSIGHTS = {
    1: "In relationships, you need a partner who respects your independence while providing emotional support. Avoid being too controlling and remember that partnership requires balance.",
    2: "You seek deep emotional connections and harmony. Your sensitivity is a gift—find partners who appreciate and reciprocate your nurturing nature.",
    3: "Your charm and wit attract many admirers. Seek partners who share your love of fun and creativity while providing emotional stability.",
    4: "Loyalty and stability are paramount in your relationships. You need a dependable partner who values commitment as much as you do.",
    5: "Freedom within relationships is essential. Find partners who understand your need for space and share your love of adventure.",
    6: "You are natural caregivers who thrive in committed relationships. Seek partners who appreciate your devotion and reciprocate your love.",
    7: "You need intellectual and spiritual connection with your partner. Find someone who respects your need for solitude and deep conversation.",
    8: "You seek partners who match your ambition and drive. Balance your focus on success with quality time and emotional intimacy.",
    9: "Your universal love extends to your relationships. Find partners who share your humanitarian values and support your giving nature.",
    11: "You need a spiritually aware partner who understands your sensitivity and visionary nature.",
    22: "Seek partners who support your ambitious goals and understand the pressures of your master builder energy.",
    33: "You need a partner who appreciates your nurturing nature and shares your commitment to serving others.",
}


def generate_report(name: str, gender: str, dob: str, language: str) -> dict:
    """
    Generate complete numerology report from user data.
    
    Args:
        name: Full name
        gender: Gender (Male/Female/Other)
        dob: Date of birth in DD-MM-YYYY format
        language: Report language (currently only English fully supported)
    
    Returns:
        Dictionary with complete numerology report
    """
    # Parse date of birth
    day, month, year = map(int, dob.split('-'))
    
    # Calculate numbers
    life_path = calculate_life_path_number(day, month, year)
    destiny = calculate_destiny_number(name)
    
    # Generate interpretations
    personality = f"{name}, {PERSONALITY_TRAITS.get(life_path, PERSONALITY_TRAITS[1])} Your numerological profile reveals a unique combination of strengths that, when properly channeled, can lead to remarkable personal and professional fulfillment."
    
    career = CAREER_INSIGHTS.get(destiny, CAREER_INSIGHTS[1])
    relationships = RELATIONSHIP_INSIGHTS.get(life_path, RELATIONSHIP_INSIGHTS[1])
    
    future_guidance = (
        f"With Life Path {life_path} and Destiny {destiny}, you are positioned for a journey of growth "
        f"and self-discovery. The coming period is favorable for taking decisive action on long-held dreams. "
        f"Trust your intuition and remain open to unexpected opportunities. Focus on aligning your daily "
        f"actions with your deeper purpose."
    )
    
    return {
        "lifePathNumber": life_path,
        "destinyNumber": destiny,
        "personality": personality,
        "career": career,
        "relationships": relationships,
        "futureGuidance": future_guidance,
    }
