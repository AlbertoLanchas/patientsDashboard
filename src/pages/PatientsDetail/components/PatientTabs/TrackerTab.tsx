import { Gauge, Activity, Droplets, Footprints, Moon, Scale, Thermometer, Apple } from 'lucide-react';
import TrackerCard from './TrackerCard';
import { useState } from 'react';
import TrackerModal from './TrackerModal';

const trackers = [
    {
        title: 'Blood Pressure',
        value: '120/80 mmHg',
        icon: <Gauge size={20} />,
        source: 'iHealth',
        sourceIcon: 'https://www.healthlabs.care/favicon/016.png',
        data: {
            labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            values: [120, 118, 122, 119, 121, 120, 118],
        },
        unit: 'mmHg'
    },
    {
        title: 'Heart Rate',
        value: '90 BPM',
        icon: <Activity size={20} />,
        source: 'Apple Health',
        sourceIcon: 'https://www.apple.com/favicon.ico',
        data: {
            labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            values: [88, 92, 90, 89, 91, 93, 90],
        },
        unit: 'BPM'
    },
    {
        title: 'Blood Glucose',
        value: '146 mg/dL',
        icon: <Droplets size={20} />,
        source: 'Abbott',
        sourceIcon: 'https://www.abbott.com/favicon.ico',
        data: {
            labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            values: [140, 145, 142, 146, 143, 141, 146],
        },
        unit: 'mg/dL'
    },
    {
        title: 'Steps',
        value: '6,000',
        icon: <Footprints size={20} />,
        source: 'Fitbit',
        sourceIcon: 'https://www.fitbit.com/favicon.ico',
        progress: 75,
        data: {
            labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            values: [5000, 6000, 5500, 7000, 6500, 6000, 6000],
        },
        unit: 'steps'
    },
    {
        title: 'Sleep',
        value: '7h 15m',
        icon: <Moon size={20} />,
        source: 'Sleep Cycle',
        sourceIcon: 'https://sleepcycle.com/icon-d.svg',
        progress: 80,
        data: {
            labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            values: [7, 6.5, 7.5, 7, 8, 7.25, 7.15],
        },
        unit: 'hours'
    },
    {
        title: 'BMI',
        value: '24.5',
        icon: <Scale size={20} />,
        source: 'iHealth',
        sourceIcon: 'https://www.healthlabs.care/favicon/016.png',
        data: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
            values: [25.1, 24.9, 24.7, 24.6, 24.5, 24.5],
        },
        unit: 'BMI'
    },
    {
        title: 'Temperature',
        value: '97.7°F',
        icon: <Thermometer size={20} />,
        source: 'iHealth',
        sourceIcon: 'https://www.healthlabs.care/favicon/016.png',
        data: {
            labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            values: [97.8, 97.6, 97.9, 97.7, 97.8, 97.6, 97.7],
        },
        unit: '°F'
    },
    {
        title: 'Calories',
        value: '1,200 cal',
        icon: <Apple size={20} />,
        source: 'Google Fit',
        sourceIcon: 'https://www.gstatic.com/images/branding/product/1x/googleg_16dp.png',
        progress: 75,
        data: {
            labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            values: [1100, 1300, 1200, 1150, 1250, 1200, 1200],
        },
        unit: 'cal'
    }
];

const TrackerTab = () => {

    const [showTrackerModal, setShowTrackerModal] = useState(false);
    const [selectedTracker, setSelectedTracker] = useState<{
        title: string;
        data: { labels: string[]; values: number[] };
        unit: string;
    } | null>(null);


    const handleTrackerClick = (tracker: { title: string; data: any; unit: string }) => {
        setSelectedTracker(tracker);
        setShowTrackerModal(true);
    };

    return (

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {trackers.map((tracker) => (
                <TrackerCard
                    key={tracker.title}
                    title={tracker.title}
                    value={tracker.value}
                    icon={tracker.icon}
                    source={tracker.source}
                    sourceIcon={tracker.sourceIcon}
                    progress={tracker.progress}
                    onClick={() => handleTrackerClick({
                        title: tracker.title,
                        data: tracker.data,
                        unit: tracker.unit
                    })}
                />
            ))}

            {showTrackerModal && selectedTracker && (
                <TrackerModal
                    isOpen={showTrackerModal}
                    onClose={() => setShowTrackerModal(false)}
                    title={selectedTracker.title}
                    data={selectedTracker.data}
                    unit={selectedTracker.unit}
                />
            )}
        </div>

    )
}

export default TrackerTab