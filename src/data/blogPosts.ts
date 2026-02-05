export interface BlogPost {
  slug: string
  title: string
  excerpt: string
  content: string
  category: string
  categorySlug: string
  author: string
  publishedAt: string
  readTime: string
  image: string
  tags: string[]
}

export const categories = [
  { name: 'All', slug: 'all' },
  { name: 'Weight Loss', slug: 'weight-loss' },
  { name: 'Muscle Building', slug: 'muscle-building' },
  { name: 'Diabetes', slug: 'diabetes' },
  { name: 'PCOD', slug: 'pcod' },
  { name: 'Nutrition', slug: 'nutrition' },
  { name: 'Exercise', slug: 'exercise' },
]

export const blogPosts: BlogPost[] = [
  {
    slug: 'indian-diet-plan-for-weight-loss',
    title: '7-Day Indian Diet Plan for Weight Loss: Lose 3-4 Kg Safely',
    excerpt: 'A scientifically-backed Indian diet plan that helps you lose weight while enjoying delicious desi food. Includes breakfast, lunch, dinner, and snacks.',
    content: `
# 7-Day Indian Diet Plan for Weight Loss

Losing weight doesn't mean you have to give up on your favorite Indian foods. With the right approach, you can enjoy delicious desi meals while achieving your weight loss goals.

## Day 1

### Breakfast (8:00 AM)
- 2 Moong dal cheela with mint chutney
- 1 cup green tea

### Mid-Morning Snack (11:00 AM)
- 1 apple or 10 almonds

### Lunch (1:00 PM)
- 1 cup brown rice
- 1 cup dal
- 1 cup mixed vegetable sabzi
- 1 small bowl raita

### Evening Snack (4:00 PM)
- 1 cup masala chai (without sugar)
- 2 multigrain biscuits

### Dinner (7:30 PM)
- 2 multigrain rotis
- 1 cup palak paneer (low oil)
- 1 bowl salad

## Key Tips for Success

1. **Stay Hydrated**: Drink at least 8-10 glasses of water daily
2. **Control Portions**: Use smaller plates to control portion sizes
3. **Avoid Late Night Eating**: Finish dinner by 8 PM
4. **Include Protein**: Every meal should have a protein source
5. **Limit Oil**: Use only 2-3 teaspoons of oil per day

## Foods to Avoid

- Fried foods (samosas, pakoras)
- Sugar and sweets
- White bread and refined flour
- Sugary drinks and sodas
- Processed foods

## Expected Results

Following this diet consistently for 4 weeks can help you lose 3-4 kg safely without feeling hungry or deprived.
    `,
    category: 'Weight Loss',
    categorySlug: 'weight-loss',
    author: 'Dr. Priya Sharma',
    publishedAt: '2024-01-15',
    readTime: '8 min read',
    image: '/images/blog/indian-diet-plan.jpg',
    tags: ['diet plan', 'weight loss', 'Indian food', 'healthy eating'],
  },
  {
    slug: 'best-exercises-for-diabetes-management',
    title: 'Best Exercises for Diabetes Management: A Complete Guide',
    excerpt: 'Learn which exercises are most effective for managing blood sugar levels and how to create a safe workout routine if you have diabetes.',
    content: `
# Best Exercises for Diabetes Management

Regular physical activity is one of the most powerful tools for managing type 2 diabetes. Exercise helps your body use insulin more efficiently and can significantly lower blood sugar levels.

## Why Exercise Matters for Diabetics

- Improves insulin sensitivity
- Helps maintain healthy weight
- Reduces cardiovascular risk
- Improves mental health
- Boosts energy levels

## Top Exercises for Diabetes

### 1. Brisk Walking
The simplest and most accessible exercise. Aim for 30 minutes daily.

**Benefits:**
- Easy to start
- Low impact
- Can be done anywhere

### 2. Swimming
Excellent for those with joint issues. Water provides natural resistance.

### 3. Cycling
Great cardiovascular exercise that's easy on the joints.

### 4. Yoga
Combines physical activity with stress reduction. Especially helpful poses:
- Surya Namaskar
- Bhujangasana (Cobra Pose)
- Dhanurasana (Bow Pose)

### 5. Resistance Training
Build muscle to improve glucose uptake. Start with:
- Bodyweight exercises
- Resistance bands
- Light weights

## Exercise Safety Tips for Diabetics

1. **Check Blood Sugar**: Before and after exercise
2. **Stay Hydrated**: Drink water throughout
3. **Wear Proper Footwear**: Protect your feet
4. **Carry Fast-Acting Carbs**: In case of hypoglycemia
5. **Start Slow**: Gradually increase intensity

## Weekly Exercise Schedule

- **Monday**: 30 min walking + 15 min yoga
- **Tuesday**: 20 min resistance training
- **Wednesday**: 30 min swimming or cycling
- **Thursday**: Rest or gentle stretching
- **Friday**: 30 min walking + 15 min yoga
- **Saturday**: 20 min resistance training
- **Sunday**: Active rest (light walk or yoga)
    `,
    category: 'Diabetes',
    categorySlug: 'diabetes',
    author: 'Dr. Rajesh Kumar',
    publishedAt: '2024-01-12',
    readTime: '10 min read',
    image: '/images/blog/diabetes-exercise.jpg',
    tags: ['diabetes', 'exercise', 'blood sugar', 'fitness'],
  },
  {
    slug: 'pcod-diet-tips-what-to-eat-avoid',
    title: 'PCOD Diet Tips: Complete Guide on What to Eat and Avoid',
    excerpt: 'Managing PCOD through diet is possible. Learn about the best foods to eat and avoid for hormonal balance and weight management.',
    content: `
# PCOD Diet Tips: What to Eat and Avoid

Polycystic Ovarian Disease (PCOD) affects millions of Indian women. While there's no cure, the right diet can significantly help manage symptoms and improve quality of life.

## Understanding PCOD and Diet

PCOD is closely linked to insulin resistance, which is why diet plays such a crucial role in management. The goal is to:

- Stabilize blood sugar levels
- Reduce inflammation
- Support hormonal balance
- Achieve healthy weight

## Foods to Include

### 1. High-Fiber Foods
- Whole grains (brown rice, oats, quinoa)
- Vegetables (leafy greens, broccoli, cauliflower)
- Legumes (dal, chickpeas, kidney beans)

### 2. Lean Proteins
- Chicken breast
- Fish (especially fatty fish like salmon)
- Eggs
- Paneer (in moderation)
- Tofu and tempeh

### 3. Healthy Fats
- Nuts and seeds (almonds, walnuts, flaxseeds)
- Olive oil
- Avocados
- Coconut oil (in moderation)

### 4. Anti-Inflammatory Foods
- Turmeric (haldi)
- Ginger (adrak)
- Tomatoes
- Green tea
- Berries

## Foods to Avoid

### 1. Refined Carbohydrates
- White bread, white rice
- Maida-based products
- Instant noodles
- Packaged snacks

### 2. Sugary Foods
- Sweets and desserts
- Sugary drinks
- Fruit juices
- Chocolate

### 3. Processed Foods
- Fast food
- Packaged meals
- Processed meats

### 4. Dairy (for some)
Some women with PCOD find that reducing dairy helps. Try eliminating for 3 weeks to see if symptoms improve.

## Sample PCOD-Friendly Day

**Breakfast**: Oats upma with vegetables + green tea

**Lunch**: Quinoa pulao + grilled chicken + raita + salad

**Snack**: Handful of nuts + 1 fruit

**Dinner**: 2 jowar rotis + palak dal + cucumber salad

## Additional Tips

1. Eat small, frequent meals
2. Don't skip breakfast
3. Stay hydrated
4. Include cinnamon in your diet
5. Exercise regularly
    `,
    category: 'PCOD',
    categorySlug: 'pcod',
    author: 'Dr. Meera Patel',
    publishedAt: '2024-01-10',
    readTime: '12 min read',
    image: '/images/blog/pcod-diet.jpg',
    tags: ['PCOD', 'diet', 'hormonal balance', 'women health'],
  },
  {
    slug: 'home-workout-plan-for-beginners',
    title: 'Complete Home Workout Plan for Beginners: No Equipment Needed',
    excerpt: 'Start your fitness journey at home with this beginner-friendly workout plan. No gym membership or equipment required.',
    content: `
# Complete Home Workout Plan for Beginners

You don't need a gym to get fit. This comprehensive home workout plan uses only your bodyweight and can be done in any small space.

## Before You Start

- Clear a small space (2m x 2m is enough)
- Wear comfortable clothes
- Keep water nearby
- Have a timer or phone ready

## Warm-Up (5 minutes)

Always start with a warm-up to prevent injuries:

1. March in place - 1 minute
2. Arm circles - 30 seconds each direction
3. Hip rotations - 30 seconds each side
4. Leg swings - 10 each leg
5. Jumping jacks - 1 minute

## Workout Plan

### Day 1: Full Body

| Exercise | Sets | Reps |
|----------|------|------|
| Squats | 3 | 12 |
| Push-ups (modified if needed) | 3 | 10 |
| Lunges | 3 | 10 each leg |
| Plank | 3 | 20 seconds |
| Mountain Climbers | 3 | 20 |

### Day 2: Cardio Focus

- Jumping Jacks: 3 sets x 30 seconds
- High Knees: 3 sets x 30 seconds
- Burpees (modified): 3 sets x 8
- Spot Jogging: 3 sets x 1 minute
- Jump Squats: 3 sets x 10

### Day 3: Rest or Light Stretching

### Day 4: Upper Body Focus

- Push-ups: 3 x 10
- Tricep Dips (using chair): 3 x 10
- Plank to Push-up: 3 x 8
- Superman: 3 x 12
- Arm Circles: 3 x 30 seconds

### Day 5: Lower Body Focus

- Squats: 4 x 15
- Lunges: 3 x 12 each
- Glute Bridges: 3 x 15
- Calf Raises: 3 x 20
- Wall Sit: 3 x 30 seconds

### Day 6: Core Focus

- Crunches: 3 x 15
- Bicycle Crunches: 3 x 20
- Plank: 3 x 30 seconds
- Side Plank: 2 x 20 seconds each
- Leg Raises: 3 x 12

### Day 7: Rest

## Cool Down (5 minutes)

After each workout:
1. Standing quad stretch
2. Hamstring stretch
3. Shoulder stretch
4. Child's pose
5. Deep breathing

## Progress Tips

- Week 1-2: Focus on form
- Week 3-4: Add 1-2 reps per set
- Week 5+: Add an extra set or new exercises
    `,
    category: 'Exercise',
    categorySlug: 'exercise',
    author: 'Coach Arjun Singh',
    publishedAt: '2024-01-08',
    readTime: '10 min read',
    image: '/images/blog/home-workout.jpg',
    tags: ['workout', 'home exercise', 'beginners', 'fitness'],
  },
  {
    slug: 'high-protein-vegetarian-foods-india',
    title: 'Top 20 High Protein Vegetarian Foods Available in India',
    excerpt: 'Building muscle on a vegetarian diet? Here are 20 protein-rich Indian foods to help you meet your daily protein requirements.',
    content: `
# Top 20 High Protein Vegetarian Foods in India

Building muscle or losing weight on a vegetarian diet is absolutely possible. India has a rich tradition of high-protein vegetarian foods that can help you meet your fitness goals.

## Understanding Protein Needs

- Sedentary adults: 0.8g per kg body weight
- Active individuals: 1.2-1.5g per kg
- Muscle building: 1.6-2.0g per kg

For a 70kg person aiming to build muscle, that's about 112-140g protein daily.

## Top 20 High-Protein Vegetarian Foods

### Legumes & Lentils

1. **Chana (Chickpeas)** - 19g per cup
   - Use in chana masala, hummus, or salads

2. **Moong Dal** - 14g per cup
   - Easy to digest, great for all meals

3. **Rajma (Kidney Beans)** - 15g per cup
   - Classic Rajma chawal is protein-packed

4. **Black Beans (Kala Chana)** - 15g per cup
   - Roast for snacks or add to curries

5. **Masoor Dal** - 18g per cup
   - Quick cooking, versatile

### Dairy Products

6. **Paneer** - 14g per 100g
   - India's favorite protein source

7. **Greek Yogurt** - 10g per 100g
   - Higher protein than regular curd

8. **Cottage Cheese (Chenna)** - 11g per 100g
   - Use in desserts or savory dishes

9. **Milk** - 8g per cup
   - Simple and effective

10. **Curd/Dahi** - 5g per cup
    - Probiotic benefits too

### Soy Products

11. **Tofu** - 8g per 100g
    - Absorbs flavors beautifully

12. **Soya Chunks** - 52g per 100g (dry)
    - Highest protein per gram!

13. **Tempeh** - 19g per 100g
    - Fermented, easier to digest

14. **Edamame** - 11g per cup
    - Great as snacks

### Nuts & Seeds

15. **Almonds** - 6g per 28g
    - Healthy snacking option

16. **Peanuts** - 7g per 28g
    - Affordable protein powerhouse

17. **Chia Seeds** - 5g per 28g
    - Also rich in omega-3

18. **Pumpkin Seeds** - 7g per 28g
    - Zinc and protein combo

### Grains

19. **Quinoa** - 8g per cup
    - Complete protein with all amino acids

20. **Oats** - 6g per cup
    - Perfect breakfast protein

## Sample High-Protein Vegetarian Day

**Breakfast (30g protein)**
- Paneer bhurji (200g paneer) + 2 rotis
- 1 glass milk

**Lunch (35g protein)**
- Rajma curry (1.5 cups) + brown rice
- Curd (1 cup)

**Snack (15g protein)**
- Roasted chana (1/2 cup)
- Handful of almonds

**Dinner (30g protein)**
- Soya chunks curry (1 cup)
- 2 rotis + dal (1 cup)

**Total: ~110g protein**
    `,
    category: 'Nutrition',
    categorySlug: 'nutrition',
    author: 'Nutritionist Kavita Rao',
    publishedAt: '2024-01-05',
    readTime: '9 min read',
    image: '/images/blog/vegetarian-protein.jpg',
    tags: ['protein', 'vegetarian', 'nutrition', 'muscle building'],
  },
  {
    slug: 'muscle-building-tips-for-skinny-guys',
    title: 'Muscle Building Tips for Skinny Guys: The Complete Guide',
    excerpt: 'Struggling to gain muscle as a hardgainer? This comprehensive guide covers everything from diet to workout strategies for skinny guys.',
    content: `
# Muscle Building Tips for Skinny Guys

If you're a skinny guy (or "hardgainer") struggling to build muscle, you're not alone. With the right approach to training and nutrition, anyone can build a muscular physique.

## Why Skinny Guys Struggle to Gain Muscle

1. **Fast Metabolism**: You burn calories quickly
2. **Low Appetite**: You think you eat a lot, but probably don't
3. **Wrong Training**: Too much cardio, not enough lifting
4. **Inconsistency**: Giving up too soon

## Nutrition: The Foundation

### Calculate Your Calories

For muscle gain, you need a caloric surplus:
- **Maintenance calories**: Bodyweight (kg) x 35
- **For gaining**: Add 300-500 calories

Example: 60kg person
- Maintenance: 60 x 35 = 2,100 calories
- For gaining: 2,400-2,600 calories

### Macronutrient Split

- **Protein**: 2g per kg bodyweight (120g for 60kg person)
- **Carbs**: 4-5g per kg bodyweight
- **Fats**: 1g per kg bodyweight

### Meal Timing

Eat every 3-4 hours:
- Breakfast (7 AM)
- Mid-morning snack (10 AM)
- Lunch (1 PM)
- Pre-workout (4 PM)
- Post-workout (7 PM)
- Dinner (9 PM)

## Training Principles

### 1. Focus on Compound Movements

- Squats
- Deadlifts
- Bench Press
- Overhead Press
- Rows
- Pull-ups

### 2. Progressive Overload

Increase weight, reps, or sets each week. Track everything.

### 3. Optimal Training Frequency

- Train each muscle group 2x per week
- 4-5 training days per week
- Include rest days

### 4. Rep Ranges

- Compound lifts: 5-8 reps
- Isolation exercises: 8-12 reps
- 3-4 sets per exercise

## Sample Workout Split

**Day 1: Upper Body A**
- Bench Press: 4x6
- Barbell Rows: 4x6
- Overhead Press: 3x8
- Bicep Curls: 3x10
- Tricep Dips: 3x10

**Day 2: Lower Body A**
- Squats: 4x6
- Romanian Deadlifts: 3x8
- Leg Press: 3x10
- Calf Raises: 4x12

**Day 3: Rest**

**Day 4: Upper Body B**
- Pull-ups: 4x8
- Incline Dumbbell Press: 3x8
- Cable Rows: 3x10
- Lateral Raises: 3x12
- Hammer Curls: 3x10

**Day 5: Lower Body B**
- Deadlifts: 4x5
- Front Squats: 3x8
- Leg Curls: 3x10
- Walking Lunges: 3x12 each

## Common Mistakes to Avoid

1. Not eating enough
2. Skipping meals
3. Too much cardio
4. Not sleeping enough (aim for 7-9 hours)
5. Program hopping - stick to one plan for 12 weeks minimum
    `,
    category: 'Muscle Building',
    categorySlug: 'muscle-building',
    author: 'Coach Rohit Malhotra',
    publishedAt: '2024-01-03',
    readTime: '11 min read',
    image: '/images/blog/muscle-building.jpg',
    tags: ['muscle building', 'skinny guys', 'workout', 'bulking'],
  },
]

export function getPostsByCategory(categorySlug: string): BlogPost[] {
  if (categorySlug === 'all') return blogPosts
  return blogPosts.filter(post => post.categorySlug === categorySlug)
}

export function getPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find(post => post.slug === slug)
}
