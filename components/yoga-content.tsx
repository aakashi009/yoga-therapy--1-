"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight, BookOpen, Clock, Heart, Shield, ChevronLeft, ChevronRight } from "lucide-react"

// Database of yoga poses for different health conditions
const yogaDatabase = {
  backpain: [
    {
      id: "utthita-trikonasana",
      name: "Utthita Trikonasana",
      description: "Utthita means extended, Trikona means triangle. This standing pose stretches and aligns the body.",
      benefits:
        "Tones leg muscles, relieves stiffness in hips and legs. Corrects minor deformities, promotes even development. Eases backaches, neck pain, strengthens ankles, improves chest expansion.",
      imageUrl: "/images/utthita-trikonasana.png",
      difficulty: "beginner",
      steps: [
        "Stand in Tadasana.",
        "Inhale, jump feet apart 3 to 3.5 feet. Arms out at shoulder level, palms down.",
        "Turn right foot 90° right and left foot slightly right.",
        "Exhale, bend right, place right palm on the floor beside the foot if possible.",
        "Stretch left arm upward in line with the shoulder, turn head to gaze at left thumb.",
        "Hold for 30 sec to 1 min, breathe evenly. Inhale and come up.",
        "Repeat on left side.",
        "Exhale and return to Tadasana.",
      ],
    },
    {
      id: "ustrasana",
      name: "Ustrasana",
      description: "“Uṣṭra” means camel.",
      benefits:
        "Corrects drooping shoulders and hunched back. Stretches and tones the entire spine. Suitable even for the elderly or those with spinal injury.",
      imageUrl: "/images/ustrasana.png",
      difficulty: "beginner",
      steps: [
        "Kneel on the floor, thighs and feet together, toes pointing back.",
        "Place palms on the hips, stretch the thighs, and arch the spine back.",
        "Exhale and place right palm on right heel, left palm on left heel (if possible).",
        "Push feet with palms, throw head back, push spine toward thighs, keeping it vertical.",
        "Tighten buttocks, stretch spine further, especially the dorsal and coccyx regions.",
        "Hold for 30 seconds, breathing normally.",
        "Release hands one by one, return to upright, then sit and relax.",
      ],
    },
    {
      id: "virabhadrasana",
      name: "Virabhadrasana",
      description:
        "Named after the warrior Vīrabhadra created by Shiva. This powerful standing pose builds strength and stability.",
      benefits:
        "Expands and opens the chest. Relieves stiffness in shoulders, back, and legs. Strengthens ankles and knees. Tones abdominal and spinal muscles. Improves stamina and posture.",
      imageUrl: "/images/virabhadrasana.png",
      difficulty: "intermediate",
      steps: [
        "Begin in Tadasana (standing pose).",
        "Raise both arms overhead, palms together.",
        "Inhale, then jump feet apart ~4 to 4.5 feet.",
        "Exhale, turn right foot 90° to the right, left foot slightly in.",
        "Stretch and bend the right leg to form a 90° angle, left leg straight and firm.",
        "Keep the face, chest, and right knee facing the right foot, spine extended upward.",
        "Hold for 20 seconds, breathing normally.",
        "Inhale, straighten the leg, and return to start.",
        "Repeat on the left side.",
      ],
    },
    {
      id: "urdhva-mukha-svanasana",
      name: "Urdhva Mukha Svanasana",
      description: "Ūrdhva means upward, Mukha means face, Śvāna means dog. The pose mimics a dog stretching with its head up.",
      benefits: "Rejuvenates the spine, Relieves stiff back, sciatica, lumbago, and slipped discs, Strengthens back, arms, thighs, and buttocks, Expands chest, improves lung capacity, Enhances pelvic blood circulation and maintains pelvic heal",
      imageUrl: "/images/urdhva mukha svanasana.png",
      difficulty: "intermediate",
      steps: [
        "Lie face down on the floor.",

"Keep feet one foot apart, toes pointing back. Place palms beside the waist, fingers forward.",

"Inhale, raise the head and chest, stretch the arms, lifting the trunk without resting the knees.",

"Legs stay straight and tight, weight on palms and toes only.",

"Stretch the spine, push chest forward, throw head back, and engage buttocks.",

"Hold for 30 seconds to 1 minute with deep breathing.",

"Exhale, bend elbows, and lower down to relax.",
      ],
    },
  ],
  // digestion
  diabetes: [
    {
      id: "prasarita-padottanasana",
      name: "Prasarita Padottanasana",
      description: "A wide-legged forward fold that massages abdominal organs and improves digestion.",
      benefits: "Massages abdominal organs, improves digestion, relieves gas and bloating.",
      imageUrl: "/images/prasarita padottanasana.png",
      difficulty: "beginner",
      steps: [
        "Stand with feet wide apart, hands on hips.",
        "Fold forward from the hips, placing hands on the floor.",
        "Keep your spine long and breathe deeply.",
        "Hold for 1-2 minutes, then slowly rise up.",
      ],
    },
    {
      id: "padangusthasana-padahastasana",
      name: "Padangusthasana/Padahastasana",
      description: "A forward fold that stimulates digestive organs and improves metabolism.",
      benefits: "Stimulates digestive organs, improves metabolism, relieves constipation.",
      imageUrl: "/images/padangusthasanapadahastasana.png",
      difficulty: "intermediate",
      steps: [
        "Stand with feet hip-width apart.",
        "Fold forward and hold your big toes or place hands under feet.",
        "Keep knees slightly bent if needed.",
        "Hold for 30-60 seconds, breathing deeply.",
      ],
    },
    {
      id: "uttaanasana",
      name: "Uttaanasana",
      description: "A standing forward fold that calms the mind and aids digestion.",
      benefits: "Aids digestion, calms nervous system, relieves stress.",
      imageUrl: "/images/uttansana.png",
      difficulty: "beginner",
      steps: [
        "Stand with feet hip-width apart.",
        "Exhale and hinge at the hips to fold forward.",
        "Let your head hang heavy and hold opposite elbows.",
        "Breathe deeply for 1-2 minutes.",
      ],
    },
    {
      id: "salabhasana-digestion",
      name: "Salabhasana",
      description: "A backbend that strengthens the core and stimulates digestive fire.",
      benefits: "Strengthens core, stimulates digestive fire, improves metabolism.",
      imageUrl: "/images/salabhasana.png",
      difficulty: "intermediate",
      steps: [
        "Lie on your stomach with arms alongside your body.",
        "Lift your chest, arms, and legs off the ground.",
        "Keep your gaze forward and breathe steadily.",
        "Hold for 15-30 seconds, then release.",
      ],
    },
    {
      id: "paripurna-navasana",
      name: "Paripurna Navasana",
      description: "A core-strengthening pose that stimulates abdominal organs and improves digestion.",
      benefits: "Strengthens core, stimulates abdominal organs, improves digestion.",
     imageUrl: "/images/paripurna navasana.png",
      difficulty: "advanced",
      steps: [
        "Sit with knees bent and feet flat on the floor.",
        "Lean back slightly and lift your feet off the ground.",
        "Straighten your legs to form a V-shape with your body.",
        "Hold for 15-30 seconds, breathing steadily.",
      ],
    },
    {
      id: "avdha-navasana",
      name: "Avdha Navasana",
      description: "A modified boat pose that gently engages the core and aids digestion.",
      benefits: "Gently engages core, aids digestion, improves abdominal strength.",
      imageUrl: "/images/avdha navasana.png",
      difficulty: "intermediate",
      steps: [
        "Sit with knees bent and feet flat on the floor.",
        "Lean back and lift your feet, keeping knees bent.",
        "Hold your shins or reach arms forward.",
        "Hold for 20-30 seconds, breathing deeply.",
      ],
    },
    {
      id: "parsva-halasana",
      name: "Parsva Halasana",
      description: "A side plow pose that massages internal organs and improves digestion.",
      benefits: "Massages internal organs, improves digestion, stimulates liver and kidneys.",
      imageUrl: "/images/parsva halasana.png",
      difficulty: "advanced",
      steps: [
        "From plow pose, slowly lower your legs to one side.",
        "Keep your legs straight and together.",
        "Hold for 30-60 seconds, then switch sides.",
        "Return to center and slowly roll down.",
      ],
    },
  ],

  // hypotension and hypertension
  anxiety: [
    {
      id: "sirasana",
      name: "Sirasana",
      description: "The king of all poses - a headstand that regulates blood pressure and improves circulation.",
      benefits: "Regulates blood pressure, improves circulation, calms the nervous system, enhances mental clarity.",
      imageUrl: "/images/sirasana.png",
      difficulty: "advanced",
      steps: [
        "Start in a kneeling position and place your forearms on the floor, elbows shoulder-width apart.",
        "Interlace your fingers and create a cup for your head.",
        "Place the crown of your head in your hands and tuck your toes under.",
        "Slowly lift your hips and walk your feet closer to your elbows.",
        "Engage your core and slowly lift your legs up, one at a time or together.",
        "Hold for 30 seconds to 5 minutes, breathing steadily.",
        "Come down slowly by reversing the steps.",
      ],
    },
    {
      id: "halasana",
      name: "Halasana",
      description: "The plow pose that helps regulate blood pressure and calms the nervous system.",
      benefits: "Regulates blood pressure, calms nervous system, improves circulation, reduces stress and anxiety.",
      imageUrl: "/images/halasana.png",
      difficulty: "intermediate",
      steps: [
        "Lie on your back with arms alongside your body, palms down.",
        "Lift your legs up to 90 degrees, then continue lifting your hips off the ground.",
        "Slowly lower your legs over your head until your toes touch the floor behind you.",
        "Keep your legs straight and support your back with your hands if needed.",
        "Hold for 1-5 minutes, breathing deeply.",
        "Slowly roll down vertebra by vertebra to return to starting position.",
      ],
    },
    {
      id: "viloma-pranayama-stage1",
      name: "Viloma Pranayama - Stage 1 (For Low BP)",
      description: "A breathing technique with interrupted inhalation that helps raise blood pressure naturally.",
      benefits: "Increases blood pressure, energizes the body, improves circulation, enhances vitality.",
      imageUrl: "/images/viloma pranayama stage 1.png",
      difficulty: "intermediate",
      steps: [
        "Sit comfortably in a cross-legged position or lie down on your back.",
        "Close your eyes and relax your entire body.",
        "Begin with normal breathing to settle into the practice.",
        "Inhale for 2-3 seconds, then pause and hold the breath for 2-3 seconds.",
        "Continue inhaling for another 2-3 seconds, then pause again.",
        "Complete the inhalation in 2-3 more stages with pauses.",
        "Exhale normally and smoothly without interruption.",
        "Repeat this cycle for 5-10 minutes.",
      ],
    },
    {
      id: "viloma-pranayama-stage2",
      name: "Viloma Pranayama - Stage 2 (For High BP)",
      description: "A breathing technique with interrupted exhalation that helps lower blood pressure naturally.",
      benefits: "Reduces blood pressure, calms the nervous system, reduces stress, promotes relaxation.",
      imageUrl: "/images/viloma pranayama stage 2.png",
      difficulty: "intermediate",
      steps: [
        "Sit comfortably in a cross-legged position or lie down on your back.",
        "Close your eyes and relax your entire body.",
        "Begin with normal breathing to settle into the practice.",
        "Inhale normally and smoothly without interruption.",
        "Exhale for 2-3 seconds, then pause and hold for 2-3 seconds.",
        "Continue exhaling for another 2-3 seconds, then pause again.",
        "Complete the exhalation in 2-3 more stages with pauses.",
        "Repeat this cycle for 5-10 minutes.",
        "End with a few normal breaths before opening your eyes.",
      ],
    },
  ],
  // meditative asana
  insomnia: [
    {
      id: "siddhasana",
      name: "Siddhasana",
      description:
        "The accomplished pose - a classic meditation posture that promotes inner stillness and concentration.",
      benefits: "Promotes deep meditation, calms the mind, improves concentration, balances energy.",
      imageUrl: "/placeholder.svg?height=300&width=400",
      difficulty: "intermediate",
      steps: [
        "Sit on the floor with legs extended in front of you.",
        "Bend your left leg and place the heel against the perineum.",
        "Bend your right leg and place the right heel above the left ankle.",
        "Tuck the toes of the right foot between the left thigh and calf.",
        "Keep your spine straight and hands in mudra position.",
        "Close your eyes and focus on your breath.",
        "Hold for 5-20 minutes for meditation practice.",
      ],
    },
    {
      id: "padmasana",
      name: "Padmasana",
      description:
        "The lotus pose - the ultimate meditation posture that promotes spiritual awakening and inner peace.",
      benefits: "Enhances meditation, promotes spiritual awareness, improves posture, calms the nervous system.",
      imageUrl: "/placeholder.svg?height=300&width=400",
      difficulty: "advanced",
      steps: [
        "Sit on the floor with legs extended in front of you.",
        "Bend your right leg and place the right foot on the left thigh, close to the hip.",
        "Bend your left leg and place the left foot on the right thigh.",
        "Both knees should touch the ground if possible.",
        "Keep your spine erect and hands in mudra position.",
        "Close your eyes and focus inward.",
        "Hold for 5-30 minutes for meditation practice.",
      ],
    },
    {
      id: "savasana",
      name: "Savasana",
      description: "The corpse pose - a complete relaxation posture that promotes deep rest and meditation.",
      benefits: "Promotes deep relaxation, reduces stress, calms the mind, prepares for meditation.",
      imageUrl: "/placeholder.svg?height=300&width=400",
      difficulty: "beginner",
      steps: [
        "Lie on your back with legs extended and arms at your sides, palms facing up.",
        "Allow your feet to fall open naturally and close your eyes.",
        "Relax every part of your body starting from your toes to your head.",
        "Focus on your natural breath without trying to control it.",
        "Let go of all thoughts and surrender completely.",
        "Remain in this pose for 10-20 minutes.",
        "Slowly wiggle your fingers and toes before sitting up.",
      ],
    },
  ],
  digestion: [
    {
      id: "salabhasana",
      name: "Salabhasana",
      description: "A pose that helps strengthen the back muscles and improve spinal alignment.",
      benefits: "Strengthens back muscles, improves spinal alignment, reduces disc pressure.",
      imageUrl: "/placeholder.svg?height=300&width=400",
      difficulty: "intermediate",
      steps: [
        "Lie on your stomach with arms alongside your body.",
        "Lift your chest and legs off the ground simultaneously.",
        "Keep your gaze forward and breathe steadily.",
        "Hold for 15-30 seconds, then release.",
      ],
    },
    {
      id: "padangusthasana-padahastasana-slipped",
      name: "Padangusthasana/Padahastasana",
      description: "A forward fold that helps decompress the spine and relieve disc pressure.",
      benefits: "Decompresses spine, relieves disc pressure, stretches hamstrings.",
      imageUrl: "/placeholder.svg?height=300&width=400",
      difficulty: "intermediate",
      steps: [
        "Stand with feet hip-width apart.",
        "Fold forward from the hips, keeping knees slightly bent.",
        "Hold your big toes or place hands under feet.",
        "Hold for 30-60 seconds, breathing deeply.",
      ],
    },
    {
      id: "dhanurasana",
      name: "Dhanurasana",
      description: "A backbend that strengthens the entire back and improves spinal flexibility.",
      benefits: "Strengthens back muscles, improves spinal flexibility, reduces stiffness.",
      imageUrl: "/placeholder.svg?height=300&width=400",
      difficulty: "advanced",
      steps: [
        "Lie on your stomach with arms alongside your body.",
        "Bend your knees and reach back to hold your ankles.",
        "Lift your chest and thighs off the ground, creating a bow shape.",
        "Hold for 20-30 seconds while breathing steadily.",
      ],
    },
    {
      id: "bhujangasana-1",
      name: "Bhujangasana I",
      description: "A gentle backbend that strengthens the spine and opens the chest.",
      benefits: "Strengthens spine, opens chest, improves posture, relieves back pain.",
      imageUrl: "/placeholder.svg?height=300&width=400",
      difficulty: "beginner",
      steps: [
        "Lie face down with palms flat on the floor under your shoulders.",
        "Press your palms into the floor and slowly lift your chest.",
        "Keep your pelvis on the floor and shoulders relaxed.",
        "Hold for 15-30 seconds, breathing deeply.",
      ],
    },
    {
      id: "urdhva-mukha-svanasana-slipped",
      name: "Urdhva Mukha Svanasana",
      description: "An upward-facing pose that strengthens the back and opens the chest.",
      benefits: "Strengthens back muscles, opens chest, improves spinal extension.",
      imageUrl: "/placeholder.svg?height=300&width=400",
      difficulty: "intermediate",
      steps: [
        "Start in a plank position with hands under shoulders.",
        "Roll over your toes and lift your thighs off the ground.",
        "Press through your hands and open your chest.",
        "Hold for 15-30 seconds, then release.",
      ],
    },
  ],
  hypertension: [
    {
      id: "parvatasana",
      name: "Parvatasana",
      description: "The mountain pose that helps strengthen and mobilize the shoulder joints.",
      benefits: "Strengthens shoulders, improves shoulder mobility, relieves shoulder tension and stiffness.",
      imageUrl: "/placeholder.svg?height=300&width=400",
      difficulty: "beginner",
      steps: [
        "Sit in a comfortable cross-legged position with spine erect.",
        "Interlace your fingers and turn your palms outward.",
        "Inhale and raise your arms overhead, stretching upward.",
        "Keep your shoulders relaxed and away from your ears.",
        "Hold for 30-60 seconds, breathing deeply.",
        "Release and repeat with the opposite interlacing of fingers.",
      ],
    },
    {
      id: "ardha-baddha-padma-paschimottanasana",
      name: "Ardha Baddha Padma Paschimottanasana",
      description: "A seated forward fold with one leg in lotus that stretches the shoulders and spine.",
      benefits: "Stretches shoulders and spine, improves shoulder flexibility, calms the mind.",
      imageUrl: "/placeholder.svg?height=300&width=400",
      difficulty: "advanced",
      steps: [
        "Sit with legs extended in front of you.",
        "Bend your right leg and place the right foot on the left thigh in half lotus.",
        "Reach your right arm behind your back and hold the right big toe.",
        "Inhale and lengthen your spine, then exhale and fold forward over the left leg.",
        "Hold for 30-60 seconds, then repeat on the other side.",
      ],
    },
  ],
  arthritis: [
    {
      id: "eka-pada-sarvangasana",
      name: "Eka Pada Sarvangasana",
      description: "One-legged shoulder stand that stimulates kidney function and improves circulation.",
      benefits: "Stimulates kidneys, improves circulation, detoxifies the body, strengthens core.",
      imageUrl: "/placeholder.svg?height=300&width=400",
      difficulty: "advanced",
      steps: [
        "Start in Sarvangasana (shoulder stand) with both legs up.",
        "Keep your left leg vertical and slowly lower your right leg toward the floor behind your head.",
        "Keep both legs straight and maintain balance.",
        "Hold for 30-60 seconds, then switch legs.",
        "Return to full shoulder stand before coming down.",
      ],
    },
    {
      id: "parsvaika-pada-sarvangasana",
      name: "Parsvaika Pada Sarvangasana",
      description: "Side one-legged shoulder stand that enhances kidney function and spinal flexibility.",
      benefits: "Enhances kidney function, improves spinal flexibility, stimulates abdominal organs.",
      imageUrl: "/placeholder.svg?height=300&width=400",
      difficulty: "advanced",
      steps: [
        "Start in Sarvangasana (shoulder stand) with both legs up.",
        "Keep your left leg vertical and slowly lower your right leg to the right side.",
        "Try to touch the floor with your right toes while keeping the left leg straight up.",
        "Hold for 30-60 seconds, then switch sides.",
        "Return to center before coming down.",
      ],
    },
    {
      id: "paripurna-navasana-kidney",
      name: "Paripurna Navasana",
      description: "Full boat pose that strengthens the core and stimulates kidney function.",
      benefits: "Strengthens core, stimulates kidneys, improves digestion, enhances balance.",
      imageUrl: "/placeholder.svg?height=300&width=400",
      difficulty: "advanced",
      steps: [
        "Sit with knees bent and feet flat on the floor.",
        "Lean back slightly and lift your feet off the ground.",
        "Straighten your legs to form a V-shape with your body.",
        "Extend your arms parallel to the floor.",
        "Hold for 15-30 seconds, breathing steadily.",
      ],
    },
    {
      id: "baddha-konasana-kidney",
      name: "Baddha Konasana",
      description: "Bound angle pose that opens the hips and stimulates kidney and bladder function.",
      benefits: "Stimulates kidneys and bladder, opens hips, improves circulation in pelvis.",
      imageUrl: "/placeholder.svg?height=300&width=400",
      difficulty: "beginner",
      steps: [
        "Sit with the soles of your feet together, knees bent out to the sides.",
        "Hold your feet with your hands and gently draw your heels toward your pelvis.",
        "Sit tall and breathe deeply, allowing your knees to relax toward the floor.",
        "For a deeper stretch, gently fold forward from the hips.",
        "Hold for 1-3 minutes, focusing on your breath.",
      ],
    },
    {
      id: "maha-mudra",
      name: "Maha Mudra",
      description: "The great seal - a powerful pose that stimulates kidney function and promotes healing.",
      benefits: "Stimulates kidneys, promotes healing, improves digestion, balances energy.",
      imageUrl: "/placeholder.svg?height=300&width=400",
      difficulty: "intermediate",
      steps: [
        "Sit with your left leg extended and right heel pressed against the perineum.",
        "Inhale and lengthen your spine, then exhale and fold forward over the left leg.",
        "Hold your left foot with both hands or use a strap.",
        "Apply gentle pressure with the right heel and engage the pelvic floor.",
        "Hold for 1-2 minutes, then repeat on the other side.",
      ],
    },
    {
      id: "janu-sirasana",
      name: "Janu Sirasana",
      description: "Head-to-knee pose that stimulates kidney function and calms the mind.",
      benefits: "Stimulates kidneys, calms the mind, stretches hamstrings, improves digestion.",
      imageUrl: "/placeholder.svg?height=300&width=400",
      difficulty: "intermediate",
      steps: [
        "Sit with your left leg extended and right foot against the inner left thigh.",
        "Inhale and lengthen your spine, turning slightly toward the extended leg.",
        "Exhale and fold forward over the left leg, reaching for your foot.",
        "Keep your spine long and avoid rounding your back.",
        "Hold for 1-2 minutes, then repeat on the other side.",
      ],
    },
  ],
  respiratory: [
    {
      id: "salamba-sarvangasana-1",
      name: "Salamba Sarvangasana I",
      description: "Supported shoulder stand that improves respiratory function and circulation.",
      benefits: "Improves respiratory function, enhances circulation, calms the nervous system, boosts immunity.",
      imageUrl: "/placeholder.svg?height=300&width=400",
      difficulty: "intermediate",
      steps: [
        "Lie on your back with arms alongside your body, palms down.",
        "Lift your legs up to 90 degrees, then continue lifting your hips off the ground.",
        "Support your back with your hands, elbows on the floor.",
        "Straighten your legs and body, creating a straight line from shoulders to toes.",
        "Keep your weight on your shoulders, not your neck.",
        "Hold for 1-5 minutes, breathing deeply.",
        "Come down slowly by lowering your back to the floor vertebra by vertebra.",
      ],
    },
  ],
  migraine: [
    {
      id: "siddhasana-knee",
      name: "Siddhasana",
      description: "The accomplished pose that helps strengthen and stabilize knee and ankle joints.",
      benefits: "Strengthens knees and ankles, improves joint stability, enhances meditation posture.",
      imageUrl: "/placeholder.svg?height=300&width=400",
      difficulty: "intermediate",
      steps: [
        "Sit on the floor with legs extended in front of you.",
        "Bend your left leg and place the heel against the perineum.",
        "Bend your right leg and place the right heel above the left ankle.",
        "Adjust the position to ensure comfort in knees and ankles.",
        "Keep your spine straight and hands in mudra position.",
        "Hold for 5-15 minutes, focusing on joint stability.",
      ],
    },
    {
      id: "virasana",
      name: "Virasana",
      description: "Hero pose that strengthens the knees and ankles while improving posture.",
      benefits: "Strengthens knees and ankles, improves posture, aids digestion, calms the mind.",
      imageUrl: "/placeholder.svg?height=300&width=400",
      difficulty: "intermediate",
      steps: [
        "Kneel on the floor with your knees together and feet slightly wider than hip-width.",
        "Slowly sit back between your feet, keeping your spine erect.",
        "If uncomfortable, place a cushion or block under your sitting bones.",
        "Rest your hands on your thighs and breathe deeply.",
        "Hold for 1-5 minutes, gradually increasing the duration.",
      ],
    },
    {
      id: "padmasana-knee",
      name: "Padmasana",
      description: "Lotus pose that promotes flexibility and strength in knee and ankle joints.",
      benefits: "Improves knee and ankle flexibility, strengthens joints, enhances meditation practice.",
      imageUrl: "/placeholder.svg?height=300&width=400",
      difficulty: "advanced",
      steps: [
        "Sit on the floor with legs extended in front of you.",
        "Bend your right leg and place the right foot on the left thigh, close to the hip.",
        "Bend your left leg and place the left foot on the right thigh.",
        "Ensure both knees are comfortable and gradually work toward touching the ground.",
        "Keep your spine erect and hands in mudra position.",
        "Hold for 5-20 minutes, building up gradually.",
      ],
    },
    {
      id: "trianga-mukhaikapada-paschimottanasana",
      name: "Trianga Mukhaikapada Paschimottanasana",
      description: "Three-limbed forward fold that stretches and strengthens the knee and ankle joints.",
      benefits: "Stretches and strengthens knees and ankles, improves flexibility, calms the mind.",
      imageUrl: "/placeholder.svg?height=300&width=400",
      difficulty: "advanced",
      steps: [
        "Sit with your left leg extended and right leg bent back beside your hip (hero pose position).",
        "Ensure both sitting bones are grounded evenly.",
        "Inhale and lengthen your spine, then exhale and fold forward over the extended leg.",
        "Hold your left foot with both hands or use a strap.",
        "Hold for 1-2 minutes, then repeat on the other side.",
      ],
    },
  ],
  obesity: [
    {
      id: "karnapidasana",
      name: "Karnapidasana",
      description: "Ear pressure pose that improves circulation and stimulates the nervous system.",
      benefits: "Improves blood circulation, stimulates nervous system, calms the mind, enhances flexibility.",
      imageUrl: "/placeholder.svg?height=300&width=400",
      difficulty: "advanced",
      steps: [
        "Start in Halasana (plow pose) with your toes touching the floor behind your head.",
        "Bend your knees and bring them down toward your ears.",
        "Wrap your arms around your legs and clasp your hands.",
        "Allow your knees to gently press against your ears.",
        "Hold for 30-60 seconds, breathing deeply.",
        "Slowly return to plow pose, then roll down vertebra by vertebra.",
      ],
    },
  ],
  bladder: [
    {
      id: "adho-mukha-svanasana",
      name: "Adho Mukha Svanasana",
      description: "Downward facing dog that builds strength, flexibility, and endurance for athletic performance.",
      benefits: "Builds full-body strength, improves flexibility, enhances endurance, energizes the body.",
      imageUrl: "/placeholder.svg?height=300&width=400",
      difficulty: "intermediate",
      steps: [
        "Start on your hands and knees with hands shoulder-width apart.",
        "Tuck your toes and lift your hips up and back to form an inverted V shape.",
        "Press your hands into the mat and lengthen through your spine.",
        "Keep a slight bend in the knees if hamstrings are tight.",
        "Hold for 1-3 minutes, breathing deeply.",
        "Focus on building strength and stability for athletic performance.",
      ],
    },
    {
      id: "supta-virasana",
      name: "Supta Virasana",
      description: "Reclined hero pose that enhances recovery and flexibility for athletes.",
      benefits: "Enhances recovery, improves flexibility, stretches quadriceps, calms the nervous system.",
      imageUrl: "/placeholder.svg?height=300&width=400",
      difficulty: "advanced",
      steps: [
        "Start in Virasana (hero pose) sitting between your feet.",
        "Slowly lean back, supporting yourself with your hands and forearms.",
        "If comfortable, lower all the way down to lie on your back.",
        "Keep your knees together and on the floor if possible.",
        "Use props under your back if needed for comfort.",
        "Hold for 2-5 minutes, focusing on deep relaxation and recovery.",
      ],
    },
  ],
  menstrual: [
    {
      id: "upavistha-konasana",
      name: "Upavistha Konasana",
      description: "Wide-angle seated forward fold that helps relieve menstrual discomfort and tension.",
      benefits: "Relieves menstrual cramps, reduces pelvic tension, calms the nervous system, improves circulation.",
      imageUrl: "/placeholder.svg?height=300&width=400",
      difficulty: "intermediate",
      steps: [
        "Sit with your legs extended wide apart, as wide as comfortable.",
        "Keep your knees and toes pointing up toward the ceiling.",
        "Place your hands behind you and lengthen your spine.",
        "Slowly walk your hands forward, folding from the hips.",
        "Go only as far as comfortable, avoiding strain.",
        "Hold for 1-3 minutes, breathing deeply and focusing on relaxation.",
      ],
    },
    {
      id: "uttanasana-menstrual",
      name: "Uttanasana",
      description: "Standing forward fold that helps relieve menstrual cramps and calms the mind.",
      benefits: "Relieves menstrual cramps, calms the mind, reduces stress, improves circulation.",
      imageUrl: "/placeholder.svg?height=300&width=400",
      difficulty: "beginner",
      steps: [
        "Stand with feet hip-width apart.",
        "Exhale and hinge at the hips to fold forward.",
        "Let your head hang heavy and hold opposite elbows.",
        "Sway gently from side to side if it feels good.",
        "Breathe deeply for 1-2 minutes, focusing on releasing tension.",
      ],
    },
    {
      id: "baddha-konasana-menstrual",
      name: "Baddha Konasana",
      description: "Bound angle pose that opens the hips and relieves menstrual discomfort.",
      benefits: "Relieves menstrual cramps, opens hips, improves circulation in pelvis, calms the mind.",
      imageUrl: "/placeholder.svg?height=300&width=400",
      difficulty: "beginner",
      steps: [
        "Sit with the soles of your feet together, knees bent out to the sides.",
        "Hold your feet with your hands and gently draw your heels toward your pelvis.",
        "Sit tall and breathe deeply, allowing your knees to relax toward the floor.",
        "For menstrual relief, you can gently fold forward from the hips.",
        "Hold for 2-5 minutes, focusing on releasing tension in the pelvis.",
      ],
    },
    {
      id: "child-pose-wide",
      name: "Wide-Knee Child's Pose",
      description: "A gentle restorative pose that helps relieve menstrual cramps and lower back pain.",
      benefits: "Relieves menstrual cramps, reduces lower back pain, calms the nervous system.",
      imageUrl: "/placeholder.svg?height=300&width=400",
      difficulty: "beginner",
      steps: [
        "Kneel on the floor with your knees wide apart and big toes touching.",
        "Sit back on your heels and fold forward, extending your arms in front of you.",
        "Rest your forehead on the mat and breathe deeply.",
        "Hold for 3-5 minutes, focusing on releasing tension.",
      ],
    },
    {
      id: "supine-twist",
      name: "Supine Spinal Twist",
      description: "A gentle twist that helps relieve menstrual discomfort and improves digestion.",
      benefits: "Relieves menstrual cramps, improves digestion, releases lower back tension.",
      imageUrl: "/placeholder.svg?height=300&width=400",
      difficulty: "beginner",
      steps: [
        "Lie on your back with arms extended in a T-shape.",
        "Bring your right knee to your chest, then cross it over to the left side.",
        "Keep your right shoulder grounded and turn your head to the right.",
        "Hold for 1-2 minutes, then repeat on the other side.",
      ],
    },
    {
      id: "goddess-pose",
      name: "Goddess Pose",
      description: "A hip-opening pose that helps strengthen the pelvic floor and relieve menstrual discomfort.",
      benefits: "Strengthens pelvic floor, improves circulation, reduces menstrual pain.",
      imageUrl: "/placeholder.svg?height=300&width=400",
      difficulty: "intermediate",
      steps: [
        "Stand with feet wide apart, toes turned out at 45 degrees.",
        "Bend your knees and lower into a squat position.",
        "Keep your spine straight and hands on your hips or in prayer position.",
        "Hold for 30-60 seconds, breathing deeply.",
      ],
    },
  ],
}

interface YogaContentProps {
  showOnlyPrerequisites?: boolean
}

export default function YogaContent({ showOnlyPrerequisites = false }: YogaContentProps) {
  const [selectedCondition, setSelectedCondition] = useState<string | null>(null)
  const [poses, setPoses] = useState<any[]>([])
  const [currentPoseIndex, setCurrentPoseIndex] = useState(0)

  useEffect(() => {
    // Listen for custom event from Sidebar
    const handleConditionSelected = (event: any) => {
      setSelectedCondition(event.detail.conditionId)
      const conditionPoses = yogaDatabase[event.detail.conditionId as keyof typeof yogaDatabase] || []
      setPoses(conditionPoses)
      setCurrentPoseIndex(0) // Reset to first pose when condition changes
    }

    document.addEventListener("conditionSelected", handleConditionSelected)

    return () => {
      document.removeEventListener("conditionSelected", handleConditionSelected)
    }
  }, [])

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "beginner":
        return "bg-[#00DF82]"
      case "intermediate":
        return "bg-[#03624C]"
      case "advanced":
        return "bg-[#030F0F]"
      default:
        return "bg-gray-500"
    }
  }

  const getDifficultyLabel = (difficulty: string) => {
    switch (difficulty) {
      case "beginner":
        return "Beginner"
      case "intermediate":
        return "Intermediate"
      case "advanced":
        return "Advanced"
      default:
        return "Unknown"
    }
  }

  const nextPose = () => {
    if (currentPoseIndex < poses.length - 1) {
      setCurrentPoseIndex(currentPoseIndex + 1)
    }
  }

  const previousPose = () => {
    if (currentPoseIndex > 0) {
      setCurrentPoseIndex(currentPoseIndex - 1)
    }
  }

  // Show only prerequisites section
  if (showOnlyPrerequisites) {
    return (
      <div className="bg-white rounded-lg shadow p-6 border border-[#03624C]/20">
        <div className="bg-gradient-to-r from-green-50 to-teal-50 rounded-xl p-8 border border-[#00DF82]/20">
          <div className="flex items-center justify-center mb-6">
            <BookOpen className="w-16 h-16 text-[#00DF82]" />
          </div>
          <h2 className="text-2xl font-bold text-[#030F0F] mb-4 text-center">Yoga Prerequisites</h2>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto text-center">
            Before starting your yoga journey, it is essential to understand the safety measures, preparation steps, and
            best forms of yoga.Learn what you need to know for a safe and effective practice.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="flex flex-col items-center p-4">
              <Shield className="w-8 h-8 text-red-600 mb-2" />
              <h4 className="font-semibold text-[#030F0F] mb-1">Safety Guidelines</h4>
              <p className="text-sm text-gray-600 text-center">Essential safety rules and precautions</p>
            </div>
            <div className="flex flex-col items-center p-4">
              <Clock className="w-8 h-8 text-[#03624C] mb-2" />
              <h4 className="font-semibold text-[#030F0F] mb-1">Timing & Preparation</h4>
              <p className="text-sm text-gray-600 text-center">When and how to practice yoga</p>
            </div>
            <div className="flex flex-col items-center p-4">
              <Heart className="w-8 h-8 text-[#00DF82] mb-2" />
              <h4 className="font-semibold text-[#030F0F] mb-1">Health Considerations</h4>
              <p className="text-sm text-gray-600 text-center">Medical advice and contraindications</p>
            </div>
          </div>

          <div className="text-center">
            <Link
              href="/yoga-prerequisites"
              className="inline-flex items-center bg-[#00DF82] text-[#030F0F] px-8 py-3 rounded-lg font-semibold hover:bg-[#03624C] hover:text-white transition-colors shadow-lg hover:shadow-xl"
            >
              Learn Yoga Prerequisites
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </div>
        </div>
      </div>
    )
  }

  // Show welcome section or selected condition poses
  if (!selectedCondition) {
    return (
      <div className="md:w-3/4 bg-white rounded-lg shadow p-6 border border-[#03624C]/20">
        <div className="text-center py-8">
          <h2 className="text-3xl font-bold text-[#030F0F] mb-4">Welcome to YogaHealing</h2>
          <p className="text-gray-600 mb-8 text-lg">
            Select a health condition from the sidebar to view recommended yoga poses tailored for your specific needs.
          </p>

          <div className="w-24 h-24 mx-auto mb-6">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-full h-full text-[#00DF82]"
            >
              <path d="M18 8h1a4 4 0 0 1 0 8h-1"></path>
              <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"></path>
              <line x1="6" y1="1" x2="6" y2="4"></line>
              <line x1="10" y1="1" x2="10" y2="4"></line>
              <line x1="14" y1="1" x2="14" y2="4"></line>
            </svg>
          </div>
          <p className="text-gray-500 italic">
            "Yoga is the journey of the self, through the self, to the self." — The Bhagavad Gita
          </p>

          <div className="mt-8 bg-gradient-to-r from-green-50 to-teal-50 rounded-lg p-6 border border-[#00DF82]/20">
            <h3 className="text-lg font-semibold text-[#030F0F] mb-2">How to Get Started:</h3>
            <ol className="text-left text-gray-700 space-y-2 max-w-md mx-auto">
              <li className="flex items-start">
                <span className="bg-[#00DF82] text-[#030F0F] rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 mt-0.5">
                  1
                </span>
                <span>Read the yoga prerequisites above</span>
              </li>
              <li className="flex items-start">
                <span className="bg-[#00DF82] text-[#030F0F] rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 mt-0.5">
                  2
                </span>
                <span>Choose your health condition from the sidebar</span>
              </li>
              <li className="flex items-start">
                <span className="bg-[#00DF82] text-[#030F0F] rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 mt-0.5">
                  3
                </span>
                <span>Follow the recommended yoga poses</span>
              </li>
            </ol>
          </div>
        </div>
      </div>
    )
  }

  // Get condition name from ID
  const conditionName =
    Object.values(healthConditions).find((condition) => condition.id === selectedCondition)?.name || selectedCondition

  // Show single pose with navigation
  if (poses.length > 0) {
    const currentPose = poses[currentPoseIndex]

    return (
      <div className="md:w-3/4 bg-white rounded-lg shadow p-6 border border-[#03624C]/20">
        {/* Header with pose counter */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold text-[#030F0F]">Yoga Poses for {conditionName}</h2>
          <div className="text-sm text-gray-600">
            Pose {currentPoseIndex + 1} of {poses.length}
          </div>
        </div>

        {/* Current Pose Display */}
        <div className="space-y-6">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="md:w-1/3">
              <div className="relative h-60 w-full rounded-lg overflow-hidden border-2 border-[#00DF82]/20">
                <Image
                  src={currentPose.imageUrl || "/placeholder.svg"}
                  alt={currentPose.name}
                  fill
                  className="object-cover"
                />
              </div>
            </div>
            <div className="md:w-2/3">
              <div className="flex items-center gap-3 mb-2">
                <h3 className="text-xl font-semibold text-[#030F0F]">{currentPose.name}</h3>
                {/* Difficulty Level Indicator */}
                <div className="flex items-center gap-2">
                  <div
                    className={`w-3 h-3 rounded-full ${getDifficultyColor(currentPose.difficulty)}`}
                    title={`Difficulty: ${getDifficultyLabel(currentPose.difficulty)}`}
                  ></div>
                  <span className="text-sm text-gray-600">{getDifficultyLabel(currentPose.difficulty)}</span>
                </div>
              </div>
              <p className="text-gray-700 mb-4">{currentPose.description}</p>

              <h4 className="font-medium text-[#030F0F] mb-2">Benefits:</h4>
              <p className="text-gray-700 mb-4">{currentPose.benefits}</p>

              <h4 className="font-medium text-[#030F0F] mb-2">How to practice:</h4>
              <ol className="list-decimal list-inside text-gray-700 space-y-1">
                {currentPose.steps.map((step: string, index: number) => (
                  <li key={index}>{step}</li>
                ))}
              </ol>
            </div>
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-between items-center pt-6 border-t border-[#03624C]/20">
            <button
              onClick={previousPose}
              disabled={currentPoseIndex === 0}
              className={`flex items-center px-6 py-3 rounded-lg font-medium transition-colors ${
                currentPoseIndex === 0
                  ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                  : "bg-[#00DF82] text-[#030F0F] hover:bg-[#03624C] hover:text-white"
              }`}
            >
              <ChevronLeft className="mr-2 w-5 h-5" />
              Previous Asana
            </button>

            <div className="text-center">
              <p className="text-sm text-gray-600 mb-1">Current Pose</p>
              <p className="font-semibold text-[#030F0F]">{currentPose.name}</p>
            </div>

            <button
              onClick={nextPose}
              disabled={currentPoseIndex === poses.length - 1}
              className={`flex items-center px-6 py-3 rounded-lg font-medium transition-colors ${
                currentPoseIndex === poses.length - 1
                  ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                  : "bg-[#00DF82] text-[#030F0F] hover:bg-[#03624C] hover:text-white"
              }`}
            >
              Next Asana
              <ChevronRight className="ml-2 w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="md:w-3/4 bg-white rounded-lg shadow p-6 border border-[#03624C]/20">
      <h2 className="text-2xl font-semibold text-[#030F0F] mb-6">Yoga Poses for {conditionName}</h2>
      <p className="text-gray-600">No poses found for this condition.</p>
    </div>
  )
}

// Type definition for health conditions
const healthConditions: {
  id: string
  name: string
}[] = [
  { id: "backpain", name: "Back Pain" },
  { id: "diabetes", name: "Digestion" },
  { id: "anxiety", name: "Hypotension and Hypertension" },
  { id: "insomnia", name: "Meditative asana" },
  { id: "digestion", name: "Slipped Disc" },
  { id: "hypertension", name: "Shoulder Problem" },
  { id: "arthritis", name: "Kidneys Problem" },
  { id: "respiratory", name: "Respiratory Problems" },
  { id: "migraine", name: "Knee and Ankle problem" },
  { id: "obesity", name: "Blood Circulation" },
  { id: "bladder", name: "Yoga for Athlete" },
  { id: "menstrual", name: "Menstrual Pain" },
]
