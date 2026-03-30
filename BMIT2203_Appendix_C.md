# BMIT2203 HUMAN COMPUTER INTERACTION
## ASSIGNMENT REPORT: DESIGN & PROTOTYPING (APPENDIX C)

### (i) Preliminary Design (5 marks)
*(Note to student: You now need to include 12 rough sketches/wireframes here. As requested by your tutor, do not write descriptions here, just the figure titles!)*

**Figure 1:** User Authentication (Login & Sign Up)  
**Figure 2:** Search & Discovery (Home Screen)  
**Figure 3:** Build & Customize Order (Food Item Detail)  
**Figure 4:** Review & Checkout (Shopping Cart)  
**Figure 5:** Payment Checkout & Validation  
**Figure 6:** Digital Receipt & Success Prompt  
**Figure 7:** Live Delivery Tracking & Chat  
**Figure 8:** Rate Your Experience  
**Figure 9:** My Orders (History)  
**Figure 10:** User Profile & Saved Addresses  
**Figure 11:** Payment Methods & Notifications  
**Figure 12:** Help & Support (FAQ)  

---

### (ii) Detail Design (15 marks)
*(Note to student: Insert your 12 colorful Figma/React screenshots here. Copy and paste the text below under each respective screenshot. This perfectly hits the 10 marks for design decisions!)*

*[ Insert Screenshot of Auth Screen here ]*
**Figure 13: High-Fidelity Login & Authentication Screen**
* **Design Decisions (User Needs):** Accommodates both returning and new users by integrating clear "Log In" and "Sign Up" options, allowing new users to create an account quickly without friction.
* **Usability Goals (Safety / Error Prevention):** Implements real-time form validation. If a user enters an invalid phone number or email during Sign Up/Login, vivid red error text appears immediately, preventing "slip" errors before the user clicks submit.
* **Cognitive Issues (Memory Load):** High-contrast text and prominent "Continue with Google/Apple" social login buttons reduce cognitive load, as users do not have to memorize or type out new passwords (Miller's Law).

*[ Insert Screenshot of Home Screen here ]*
**Figure 14: High-Fidelity Search & Discovery (Home Screen)**
* **Design Decisions (User Needs):** Sarah’s primary frustration is wasting her 1-hour lunch break. To solve this, a prominent "Quick Reorder" carousel is placed at the top.
* **Usability Goals (Efficiency):** We placed "Halal" and "< RM15" as quick-tap filter chips directly under the search bar rather than hiding them in a sub-menu, minimizing the number of clicks required to find food.
* **Cognitive Issues (Hick’s Law):** Hick’s Law states that more choices increase decision time. Instead of an endless list, the home feed chunks food into distinct visual categories (e.g., "Popular Dishes"), overcoming decision paralysis.

*[ Insert Screenshot of Item Screen here ]*
**Figure 15: High-Fidelity Build & Customize Order (Item Screen)**
* **Design Decisions (User Needs):** Addresses the frustration of restaurants ignoring manual text notes by providing explicit checkboxes for dietary exclusions (e.g., [ ] No Peanuts,[ ] Less Spicy).
* **Usability Goals (Effectiveness):** Ensures the final product matches the user's specific intent 100% by using mandatory radio buttons for portion sizes before the item can be added to the cart.
* **Cognitive Issues (Visual Clarity):** Features a sticky "Add to Cart" button at the bottom that constantly updates the total price, so the user does not have to mentally calculate the cost while scrolling through add-ons.

*[ Insert Screenshot of Cart Screen here ]*
**Figure 16: High-Fidelity Review & Checkout (Shopping Cart)**
* **Design Decisions (User Needs):** Provides transparency for group ordering and budget control by showing a clear breakdown of Subtotal, Delivery Fee, and Discounts. Includes an environmental "No Cutlery" toggle.
* **Usability Goals (Efficiency):** The "Apply Voucher" button is highly visible directly on the Cart screen, allowing users to claim discounts rapidly without navigating away from the checkout flow.
* **Cognitive Issues (Miller’s Law):** The cart clearly itemizes all customizations under each food item. This offloads mental calculation from the user's brain to the system, so they don't have to remember who ordered what.

*[ Insert Screenshot of Payment Screen here ]*
**Figure 17: High-Fidelity Payment Checkout & Validation**
* **Design Decisions (User Needs):** Displays multiple familiar options (TNG eWallet, GrabPay, Credit Card) to accommodate the user's preferred payment habits.
* **Usability Goals (Safety):** The "Confirm Payment" button remains disabled until a payment method is explicitly selected. Furthermore, a simulated biometric (FaceID) or OTP overlay ensures absolute financial security.
* **Cognitive Issues (System Feedback):** A full-screen semi-transparent overlay with a spinning loader ("Authenticating Payment...") provides immediate cognitive reassurance that the system is processing the transaction.

*[ Insert Screenshot of Receipt Modal here ]*
**Figure 18: High-Fidelity Digital Receipt Modal**
* **Design Decisions (User Needs):** Users ordering for a group (acting as the "Banker") need proof of transaction to split bills. The "Download Receipt" button caters directly to this social need.
* **Usability Goals (Memorability):** Uses a standard receipt layout (Order Number, Date, Itemized list) that matches physical paper receipts, leveraging the user's existing mental models.
* **Cognitive Issues (Perceptual Closure):** The large green checkmark provides distinct visual feedback, giving the user immediate cognitive closure that the high-stress financial task was successful.

*[ Insert Screenshot of Tracking Screen here ]*
**Figure 19: High-Fidelity Live Delivery Tracking & Chat**
* **Design Decisions (User Needs):** Seamless coordination at the office lobby. Prominently displays the rider's license plate and includes a dedicated "Chat" modal to easily identify the rider in a crowded corporate environment.
* **Usability Goals (Effectiveness):** The live animated map ensures the user accurately achieves their goal of intercepting the food exactly when it arrives, preventing cold food or missed deliveries.
* **Cognitive Issues (Screen Glare):** Office workers often face screen glare outdoors. The UI utilizes a high-contrast layout (stark dark text on bright backgrounds) and large ETA text so it can be read easily under bright tropical sunlight.

*[ Insert Screenshot of Rating Modal here ]*
**Figure 20: High-Fidelity Rate Your Experience Modal**
* **Design Decisions (User Needs):** Provides a quick and distinct way to leave feedback for both the restaurant's food quality and the rider's service separately.
* **Usability Goals (Learnability):** Employs the universally recognized 5-star interactive rating system. First-time users instantly understand how to use it without instructions (Jakob's Law).
* **Cognitive Issues (Error Prevention):** The "Submit Rating" button is visually greyed out and disabled until both ratings are clicked, preventing incomplete cognitive actions.

*[ Insert Screenshot of Orders History Screen here ]*
**Figure 21: High-Fidelity My Orders (History) Screen**
* **Design Decisions (User Needs):** Allows busy office workers to quickly view past successful orders and reorder them, saving time on future lunch breaks.
* **Usability Goals (Efficiency):** Eliminates the need to search for a restaurant again. A "Rate Order" or "View Rating" button is attached to each card for quick access.
* **Cognitive Issues (Color Psychology):** Uses green "Delivered" badges to leverage color psychology, allowing the user's eyes to quickly scan and recognize completed tasks amidst a list of text.

*[ Insert Screenshot of Profile Screen here ]*
**Figure 22: High-Fidelity User Profile & Saved Addresses**
* **Design Decisions (User Needs):** Sarah needs to ensure the GPS pin doesn't drift to the wrong building. This screen allows her to permanently save "Office Tower B" with accurate map coordinates.
* **Usability Goals (Efficiency):** Setting default locations (Home, Office) auto-populates the checkout screen in future orders, minimizing repetitive keystrokes.
* **Cognitive Issues (Standardized Iconography):** Uses standard icons (MapPin for addresses, Gear for settings) to reduce the time it takes the brain to process navigation options.

*[ Insert Screenshot of Notifications Screen here ]*
**Figure 23: High-Fidelity Payment Methods & Notifications**
* **Design Decisions (User Needs):** Allows users to safely manage default cards or e-wallets, and centralizes all promo alerts and delivery updates in one inbox.
* **Usability Goals (Safety):** The Credit Card addition modal uses Luhn validation, immediately throwing red errors for incorrect card lengths or expired dates.
* **Cognitive Issues (Selective Attention):** Unread notifications feature a bright orange left-border highlight, guiding the user's selective attention immediately to new information.

*[ Insert Screenshot of Support Screen here ]*
**Figure 24: High-Fidelity Help & Support Screen**
* **Design Decisions (User Needs):** Provides immediate customer service action cards ("Live Chat", "Call Us") for users panicking about a delayed or wrong order.
* **Usability Goals (Learnability):** The interactive FAQ uses standard accordion menus (Chevron arrows) that users are already familiar with from other e-commerce platforms.
* **Cognitive Issues (Visual Noise Reduction):** By collapsing FAQ answers inside the accordion and using smooth expand animations, the interface hides massive walls of text, heavily reducing visual noise and cognitive strain.
