import cron from 'node-cron';
import User from '../models/user.model.js';
import Notification from '../models/notification.model.js';

// Cron job runs every day at midnight
cron.schedule('0 0 * * *', async () => {
    try {
        console.log("Running Free Plan Counter Update...");

        const users = await User.find({ plan: 'free' });

        for (const user of users) {
            const daysOnFreePlan = Math.floor((Date.now() - new Date(user.planStartDate)) / (1000 * 60 * 60 * 24));
            
            await User.updateOne({ _id: user._id }, { freePlanDaysUsed: daysOnFreePlan });

            // Send a notification on day 30
            if (daysOnFreePlan === 28) {
                const notification = new Notification({
                    userId: user._id,
                    title: "Your Free Plan is Ending Soon!",
                    description: "Upgrade to continue enjoying premium features.",
                    link: `${process.env.FRONTEND_BASE}/plans`,
                    type: "system",
                    isRead: false,
                });
                await notification.save();
                console.log(`Notification sent to user: ${user.email}`);
            }
        }

        console.log("Free Plan Counter Updated Successfully.");
    } catch (error) {
        console.error('Error updating free plan usage:', error);
    }
});
