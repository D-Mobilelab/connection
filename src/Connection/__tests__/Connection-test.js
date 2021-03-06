import NetworkInfo from '../Connection';
import { simulateEvent } from 'cordova-test-helper';
import { NetInfoMock as netInfoMock } from 'cordova-test-helper';

describe('Connection tests', () => {
    var connection;
    beforeEach(() => {
        // netInfoMock.install();
        connection = new NetworkInfo();
    });

    afterEach(() => {
        // netInfoMock.uninstall();
    });

    it("Test ConnectionChange offline if it's a browser", (done) => {
        connection.initialize();

        var onchange = jasmine.createSpy('connchange');
        connection.addListener(onchange);

        simulateEvent('offline', { _type: 'offline' }, 1, 'window');

        setTimeout(() => {
            expect(onchange).toHaveBeenCalledWith({ type: 'offline', networkState: 'none' });
            done();
        }, 600);
    });

    it('Test connection status after initialize', () => {
        connection.initialize();
        console.log(connection.checkConnection());
        expect(connection.checkConnection()).toEqual({ type: 'online', networkState: 'none' });
        expect(connection.checkConnection()).not.toEqual({ type: 'offline', networkState: 'none' });
    });

    it('Test Connection online if it\'s a browser', (done) => {
        connection.initialize();

        var onchange = jasmine.createSpy('connchange');
        connection.addListener(onchange);

        simulateEvent('online', { _type: 'online' }, 1, 'window');

        setTimeout(() => {
            expect(onchange).toHaveBeenCalledWith({ type: 'online', networkState: 'none' });
            connection.removeListener(onchange);
            done();
        }, 600);
    });

    it('Test Connection online if cordova-network-information is defined', (done) => {
        const netInfoMockInstance = new netInfoMock();
        netInfoMockInstance.install();
        connection.initialize();

        var onchange = jasmine.createSpy('connchange');
        connection.addListener(onchange);

        simulateEvent('online', { _type: 'online' }, 1, 'window');

        setTimeout(() => {
           expect(onchange).toHaveBeenCalledWith({ type: 'online', networkState: 'wifi' });
           netInfoMockInstance.uninstall();
           // connection.removeListener('connectionchange', onchange);
           done();
       }, 600);
    });

    it('Test Connection offline if it\'s cordova-network-information defined', (done) => {
        const netInfoMockInstance = new netInfoMock();
        netInfoMockInstance.install();
        connection.initialize();

        var onchange = jasmine.createSpy('connchange');
        connection.addListener(onchange);

        // mock it
        window.navigator.connection.type = 'wifi';

        // Simulate Event
        simulateEvent('offline', { _type: 'offline' }, 1, 'window');

        setTimeout(() => {
            expect(onchange).toHaveBeenCalledWith({ type: 'offline', networkState: 'wifi' });
            done();
            // connection.removeListener('connectionchange', onchange);
            netInfoMockInstance.uninstall();
        }, 600);
    });

        
    it('Test removeListener', (done) => {
        
        connection.initialize();

        var onchange = jasmine.createSpy('connchange');
        connection.addListener(onchange);

        // mock it
        window.navigator.connection.type = 'wifi';

        connection.removeListener(onchange);
        // Simulate Event
        simulateEvent('offline', { _type: 'offline' }, 1, 'window');

        setTimeout(() => {
            expect(onchange).not.toHaveBeenCalledWith();
            done();
        }, 600);
    });    
});